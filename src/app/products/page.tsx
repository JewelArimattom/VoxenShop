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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
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

  const visibleProducts = saleFilter ? sorted.filter((p) => p.sale) : sorted;

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
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4 flex gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>

          {/* Mobile filter modal/overlay */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="text-gray-600 hover:text-gray-900 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="p-4 space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Search</label>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Price Range</label>
                    <div className="text-sm text-gray-600 mb-3 bg-blue-50 p-2 rounded">Rs {priceMin.toFixed(0)} — Rs {priceMax.toFixed(0)}</div>
                    <div className="relative space-y-2">
                      <input
                        type="range"
                        min={absoluteMinPrice}
                        max={absoluteMaxPrice}
                        value={priceMin}
                        onInput={(e) => {
                          const val = Number((e.target as HTMLInputElement).value);
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

                  {/* Categories */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-3">Categories</label>
                    <div className="space-y-2">
                      {categories.map((c) => (
                        <button
                          key={c}
                          onClick={() => setActiveCategory(c)}
                          className={`w-full text-left py-2 px-3 rounded-lg transition ${
                            activeCategory === c
                              ? 'bg-blue-600 text-white font-medium'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block bg-white rounded-lg p-4 sticky top-24 h-fit">
            <div className="space-y-4">
              <div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products"
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
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

            {visibleProducts.length === 0 ? (
              <div className="p-12 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18v4H3V3zM5 11h14v9H5v-9z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-sm text-gray-600 text-center max-w-md mb-4">
                  We couldn't find any products matching your filters{activeCategory && activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setQuery('');
                      setSaleFilter(false);
                      setPriceMin(absoluteMinPrice);
                      setPriceMax(absoluteMaxPrice);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Browse All Products
                  </button>
                  <button
                    onClick={() => {
                      setQuery('');
                      setPriceMin(absoluteMinPrice);
                      setPriceMax(absoluteMaxPrice);
                    }}
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
