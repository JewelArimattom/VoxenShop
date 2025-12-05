"use client";

import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Product Image */}
      <div className="h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">Image not available</text></svg>'
          }}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        {product.sale && product.salePrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">Sale</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-end justify-between mt-auto gap-4">
          <div className="flex flex-col">
            {product.sale && product.salePrice ? (
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-red-600">Rs {product.salePrice.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">Rs {product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-600">Rs {product.price.toFixed(2)}</span>
            )}
          </div>

          <Link
            href={`/products/${product.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 text-sm self-end"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
