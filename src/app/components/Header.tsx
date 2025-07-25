'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CartDrawer from './CartDrawer';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaSearch,
  FaShoppingCart,
} from 'react-icons/fa';
import { FaXTwitter, FaBars } from 'react-icons/fa6';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartItems = JSON.parse(cart);
      setCartCount(cartItems.length);
    }
  }, [drawerOpen]);

  return (
    <>
      <header className="w-full shadow-sm text-sm">
        {/* ✅ Mobile: App Download Message */}
        <div className="bg-rose-200 text-center text-xs text-gray-900 py-2 sm:hidden">
          Download Peachmode App On Android & iOS
        </div>

        {/* ✅ Desktop Top Bar */}
        <div className="bg-rose-200 text-gray-900 text-xs px-4 py-1 hidden sm:flex justify-between items-center">
          <div className="flex items-center space-x-3 text-sm">
            <FaFacebookF />
            <FaXTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
          <div>Download Peachmode App On Android & iOS</div>
        </div>

        {/* ✅ Middle Bar: Desktop only */}
        <div className="bg-rose-400 text-white px-4 py-2 hidden sm:flex justify-end items-center text-sm">
          <div className="space-x-4 border-l pl-4">
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Franchise</a>
            <a href="#" className="hover:underline">Store Locator</a>
            <a href="#" className="hover:underline">Track Order</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>

        {/* ✅ Mobile Header Section */}
        <div className="bg-white px-4 py-3 flex items-center justify-between sm:hidden">
          <div className="flex items-center space-x-4">
           <button onClick={() => setMobileMenuOpen(true)}>
  <FaBars className="text-black" />
</button>

            {searchOpen ? (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    const query = searchQuery.trim().toLowerCase();
                    window.location.href = `/category/${query}`;
                    setSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                autoFocus
                placeholder="Search category..."
                className="border border-gray-300 rounded px-2 py-1 text-sm w-36"
              />
            ) : (
             <button onClick={() => setSearchOpen(true)}>
  <FaSearch className="text-black" />
</button>

            )}
          </div>
          <Link href="/">
            <img
              src="/images/peachmode-logo2.png"
              alt="Peachmode"
              className="h-6"
            />
          </Link>
          <button onClick={() => setDrawerOpen(true)} className="relative">
            <FaShoppingCart className="text-base" />
            {cartCount >= 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* ✅ Desktop Main Navigation Bar */}
        <div className="bg-white border-t border-b px-4 py-4 hidden sm:block">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <img
                src="/images/peachmode-logo2.png"
                alt="Peachmode Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Center Menu */}
            <nav className="flex flex-wrap justify-center gap-6 font-medium text-gray-700 text-sm">
              <Link href="/category/newarrivals" className="hover:text-rose-500">New Arrivals</Link>
              <Link href="/category/sarees" className="hover:text-rose-500">Sarees</Link>
              <Link href="/category/salwar" className="hover:text-rose-500">Salwar Suits</Link>
              <Link href="/category/kurta" className="hover:text-rose-500">Kurtis</Link>
              <Link href="/category/tops" className="hover:text-rose-500">Tops & Tunics</Link>
              <Link href="/category/dresses" className="hover:text-rose-500">Dresses</Link>
              <Link href="/category/co-ords" className="hover:text-rose-500">Co-ords</Link>
              <Link href="/category/luxe" className="hover:text-rose-500">LUXE</Link>
              <Link href="/category/woolen" className="hover:text-rose-500">Woolen</Link>
              <Link href="/category/sale" className="hover:text-rose-500">Sale</Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-5 text-gray-800 relative">
              <button className="text-base" onClick={() => setSearchOpen(!searchOpen)}>
                <FaSearch />
              </button>

              {/* ✅ Desktop Search Input */}
              {searchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      const query = searchQuery.trim().toLowerCase();
                      window.location.href = `/category/${query}`;
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                  autoFocus
                  placeholder="Search category..."
                  className="absolute top-full mt-2 right-0 border border-gray-300 rounded px-2 py-1 text-sm w-40 z-50 bg-white shadow"
                />
              )}

              <Link href="#">Login</Link>
              <button onClick={() => setDrawerOpen(true)} className="relative">
                <FaShoppingCart className="text-base" />
                {cartCount >= 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-semibold text-lg text-black">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} className="text-xl">
            &times;
          </button>
        </div>
        <nav className="flex flex-col text-left p-4 space-y-4 font-semibold text-gray-800">
          <Link href="/category/all" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
          <Link href="/category/sarees" onClick={() => setMobileMenuOpen(false)}>Sarees</Link>
          <Link href="/category/salwar" onClick={() => setMobileMenuOpen(false)}>Salwar Suits</Link>
          <Link href="/category/kurta" onClick={() => setMobileMenuOpen(false)}>Kurtis</Link>
          <Link href="/category/tops" onClick={() => setMobileMenuOpen(false)}>Tops & Tunics</Link>
          <Link href="/category/dresses" onClick={() => setMobileMenuOpen(false)}>Dresses</Link>
          <Link href="/category/co-ords" onClick={() => setMobileMenuOpen(false)}>Co-ords</Link>
          <Link href="/category/luxe" onClick={() => setMobileMenuOpen(false)}>LUXE</Link>
        </nav>
      </div>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Header;
