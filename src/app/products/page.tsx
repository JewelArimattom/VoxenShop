"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Relevance");
  const [saleFilter, setSaleFilter] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useMemo(() => {
    const setCat = new Set<string>();
    products.forEach((p) => setCat.add(p.category));
    return ["All", ...Array.from(setCat)];
  }, []);

  const priceValues = useMemo(() => products.map(p => (p.sale && p.salePrice ? p.salePrice : p.price)), []);
  const absoluteMinPrice = useMemo(() => Math.floor(Math.min(...priceValues)), [priceValues]);
  const absoluteMaxPrice = useMemo(() => Math.ceil(Math.max(...priceValues)), [priceValues]);
  const [priceMin, setPriceMin] = useState<number>(absoluteMinPrice);
  const [priceMax, setPriceMax] = useState<number>(absoluteMaxPrice);

  // Keep min/max in sync if product set changes
  useEffect(() => {
    setPriceMin(absoluteMinPrice);
    setPriceMax(absoluteMaxPrice);
  }, [absoluteMinPrice, absoluteMaxPrice]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" ? true : p.category === activeCategory;
      const effectivePrice = (p.sale && p.salePrice) ? p.salePrice : p.price;
      const matchesPrice = effectivePrice >= priceMin && effectivePrice <= priceMax;
      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, activeCategory]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sortOption === "Price: Low to High") {
      return copy.sort((a, b) => a.price - b.price);
    }
    if (sortOption === "Price: High to Low") {
      return copy.sort((a, b) => b.price - a.price);
    }
    return copy; // Relevance (default)
  }, [filtered, sortOption]);

  useEffect(() => {
    const saleParam = searchParams?.get?.("sale");
    if (saleParam === "true") {
      setSaleFilter(true);
      setActiveCategory("All");
    } else {
      setSaleFilter(false);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-sm text-gray-600">Search and filter by category to find what you need.</p>
        </div>

        {/* Sale banners (marquee) */}
        <div className="mb-6 overflow-hidden">
          <div className="marquee flex gap-4">
            {[
              { id: 'bf', title: 'Black Friday - Up to 50% OFF', c1: 'from-orange-500', c2: 'to-red-600' },
              { id: 'hot', title: 'Hot Deals: Extra 20% off on Electronics', c1: 'from-blue-600', c2: 'to-indigo-600' },
              { id: 'fashion', title: 'Fashion Sale — New Styles 30% OFF', c1: 'from-pink-500', c2: 'to-rose-500' },
              { id: 'clear', title: 'Clearance: Limited Stock', c1: 'from-gray-700', c2: 'to-gray-900' }
            ].map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  // clicking shows sale products
                  setSaleFilter(true);
                  router.push('/products?sale=true');
                }}
                className={`min-w-[380px] cursor-pointer rounded-lg p-4 text-white flex-shrink-0 bg-gradient-to-r ${b.c1} ${b.c2}`}
              >
                <h4 className="font-bold">{b.title}</h4>
                <p className="text-sm opacity-90 mt-1">Tap to view sale items</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg p-4">
            <div className="mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Price Range</h3>
              <div className="text-sm text-gray-600 mb-2">Rs {priceMin.toFixed(0)} — Rs {priceMax.toFixed(0)}</div>
              <div className="relative">
                <input
                  type="range"
                  min={absoluteMinPrice}
                  max={absoluteMaxPrice}
                  value={priceMin}
                  onInput={(e) => {
                    const val = Number((e.target as HTMLInputElement).value);
                    // ensure priceMin < priceMax
                    const next = Math.min(val, priceMax - 1);
                    setPriceMin(next);
                  }}
                  className="w-full appearance-none h-2 bg-transparent absolute top-0 left-0"
                />
                <input
                  type="range"
                  min={absoluteMinPrice}
                  max={absoluteMaxPrice}
                  value={priceMax}
                  onInput={(e) => {
                    const val = Number((e.target as HTMLInputElement).value);
                    const next = Math.max(val, priceMin + 1);
                    setPriceMax(next);
                  }}
                  className="w-full appearance-none h-2 bg-transparent"
                />
                <div className="pointer-events-none h-2 rounded bg-gray-200 mt-3">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{
                      width: `${((priceMax - priceMin) / (absoluteMaxPrice - absoluteMinPrice)) * 100}%`,
                      marginLeft: `${((priceMin - absoluteMinPrice) / (absoluteMaxPrice - absoluteMinPrice)) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setActiveCategory(c)}
                      className={`w-full text-left py-2 px-3 rounded ${activeCategory === c ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products grid */}
          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Showing {sorted.length} results</div>
              <div className="text-sm flex items-center gap-3">
                <div>Sort:</div>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-200 rounded px-2 py-1"
                >
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(saleFilter ? sorted.filter(p => p.sale) : sorted).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
