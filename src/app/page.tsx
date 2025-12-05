import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { products } from "@/data/products";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:gap-12">
            <div className="lg:flex-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Welcome to{' '}
                <span className="text-blue-600">Voxen</span>
                <span className="text-orange-500">Shop</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
                Discover amazing products at unbeatable prices. Quality you can trust, 
                service you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-colors duration-200 inline-flex items-center justify-center gap-2"
                >
                  Shop Now
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Decorative product showcase for mobile */}
            <div className="hidden lg:flex lg:flex-1 relative h-80 items-center justify-center">
              <div className="absolute w-48 h-48 bg-yellow-300 rounded-lg shadow-lg" />
              <div className="absolute right-12 bottom-10 w-40 h-40 bg-gray-300 rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements with subtle animation */}
        <div className="absolute top-8 left-4 sm:top-10 sm:left-8">
          <div className="w-16 sm:w-28 h-16 sm:h-28 bg-blue-200/80 rounded-full blur-2xl floaty delay-200" />
        </div>
        <div className="absolute top-4 right-4 sm:top-6 sm:right-10">
          <div className="w-12 sm:w-20 h-12 sm:h-20 bg-orange-200/90 rounded-full blur-md floaty delay-500 rotate-slow" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quality Products</h3>
                <p className="text-sm text-gray-600">Handpicked for excellence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-orange-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Quick and reliable shipping</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
                <p className="text-sm text-gray-600">100% secure payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of premium products designed to enhance your lifestyle.
            </p>
          </div>

          {/* Featured carousel banner (auto horizontal scroll) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div>
              <HeroCarousel
                slides={[
                  { id: 'hb1', title: 'Up to 40% off From Rs 2,990', subtitle: 'Smartphones, Tablets and more', image: 'https://images.unsplash.com/photo-1542345307-d87fd97e0ed5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                  { id: 'hb2', title: 'Up to 50% off Electronics', subtitle: 'Speakers, Headphones and more', image: 'https://images.unsplash.com/photo-1621935054884-471b227e3bd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3BlYWtlcnMlMkMlMjBIZWFkcGhvbmVzJTIwYW5kJTIwbW9yZXxlbnwwfHwwfHx8MA%3D%3D' },
                  { id: 'hb3', title: 'Winter Fashion Deals', subtitle: 'Coats & Jackets starting Rs 999', image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q29hdHMlMjAlMjYlMjBKYWNrZXRzfGVufDB8fDB8fHww' }
                ]}
              />
            </div>
          </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust VoxenShop for their everyday needs.
          </p>
          <a
            href="/products"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            Browse All Products
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
