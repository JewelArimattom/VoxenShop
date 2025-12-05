"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Voxen<span className="text-blue-600">Shop</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link
                href="/orders"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                My Orders
              </Link>
            )}
          </div>

          {/* Right Side - Cart & User */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* User Menu - Desktop */}
            <div className="hidden md:block relative">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">{user?.name.split(' ')[0]}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {isAuthenticated && (
                <div className="flex items-center space-x-3 px-2 py-3 bg-gray-50 rounded-lg mb-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              )}
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/cart"
                className="text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/orders"
                    className="text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700 font-medium py-2 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
