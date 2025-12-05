"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const setCat = new Set<string>();
    products.forEach((p) => setCat.add(p.category));
    return ["All", ...Array.from(setCat)];
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" ? true : p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top search area similar to marketplace */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">Delivering to</p>
                <p className="text-sm font-semibold text-gray-900">Your Location</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, brands and more"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                  Search
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm px-3 py-2">Sign in</button>
              <button className="text-sm px-3 py-2">Cart</button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Big Savings on Top Brands</h2>
            <p className="mt-1 text-sm">Up to 50% off. Limited time offer.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium">Shop Deals</button>
          </div>
        </div>
      </div>

      {/* Main content: sidebar + products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold mb-3">Shop by Category</h3>
              <ul className="space-y-2 text-sm">
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
              <h3 className="text-xl font-semibold">Showing {filtered.length} results</h3>
              <div className="text-sm text-gray-600">Sort: <select className="ml-2 border-gray-200 rounded px-2 py-1"><option>Relevance</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
