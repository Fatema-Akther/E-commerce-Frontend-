'use client';

import 'rc-slider/assets/index.css';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import InfoFeatures from '@/app/components/InfoFeatures';
import ProductCardGrid from '@/app/components/ProductCardGrid';
import { allProducts, Product } from '@/app/data/products';
import CartDrawer from '@/app/components/CartDrawer';
import Slider from 'rc-slider';

const allBrands = ['Aarong', 'Yellow', 'Cats Eye', 'Dorjibari', 'Ecstasy', 'Le Reve'];

const BrandPage = () => {
  const { brand } = useParams();
  const brandParam = typeof brand === 'string' ? brand : brand?.[0] || 'all';

  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ✅ Brand selection
  const selectedBrandsToFilter =
    checkedBrands.length > 0 ? checkedBrands : brandParam === 'all' ? [] : [brandParam];

  const handleBrandChange = (brand: string) => {
    setCheckedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // ✅ Product filtering
  const filteredProducts = allProducts
    .filter((product) => {
      if (selectedBrandsToFilter.length === 0) return true;
      return selectedBrandsToFilter.includes(product.brand);
    })
    .filter((product) => {
      const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

  // ✅ Cart
  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* ✅ Mobile FILTERS Button */}
      <div className="md:hidden px-4 mt-4">
        <button
          className="flex items-center gap-1 text-black font-semibold uppercase tracking-wide"
          onClick={() => setShowMobileFilters((prev) => !prev)}
        >
          <span>FILTERS</span>
          <span className="text-sm">{showMobileFilters ? '▲' : '▼'}</span>
        </button>

        {showMobileFilters && (
          <div className="bg-pink-50 border rounded mt-2 p-4">
            {/* Filter by Brand */}
            <h3 className="text-sm font-bold mb-2 text-black">Filter by Brand</h3>
            <div className="space-y-2 mb-4">
              {allBrands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm text-black">
                  <input
                    type="checkbox"
                    checked={checkedBrands.includes(b)}
                    onChange={() => handleBrandChange(b)}
                    className="accent-rose-500"
                  />
                  {b}
                </label>
              ))}
            </div>

            {/* Filter by Price */}
            <h3 className="text-sm font-bold mb-2 text-black">Filter by Price</h3>
            <Slider
              range
              min={0}
              max={5000}
              value={priceRange}
              onChange={(value: number | number[]) => {
                if (Array.isArray(value)) setPriceRange([value[0], value[1]]);
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-black">
              <span>৳ {priceRange[0]}</span>
              <span>৳ {priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Main Content */}
      <div className="flex flex-col md:flex-row w-full px-4 py-6 gap-6">
        {/* Sidebar (Desktop only) */}
        <aside className="hidden md:block w-full md:w-[250px] h-fit sticky top-20 mt-10">
          {/* Brand Filter */}
          <h3 className="text-lg font-bold mb-4 text-black">Filter by Brand</h3>
          <div className="space-y-2 mb-6">
            {allBrands.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm text-black">
                <input
                  type="checkbox"
                  checked={checkedBrands.includes(b)}
                  onChange={() => handleBrandChange(b)}
                  className="accent-rose-500"
                />
                {b}
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2 text-black">Filter by Price</h3>

            <Slider
              range
              min={0}
              max={5000}
              value={priceRange}
              onChange={(value: number | number[]) => {
                if (Array.isArray(value)) setPriceRange([value[0], value[1]]);
              }}
            />

            <div className="flex justify-between mt-2 text-sm text-black">
              <span>৳ {priceRange[0]}</span>
              <span>৳ {priceRange[1]}</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <ProductCardGrid
            selectedBrand={selectedBrandsToFilter}
            onAddToCart={handleAddToCart}
            isVertical={true}
            products={filteredProducts}
          />
        </main>
      </div>

      <InfoFeatures />
      <Footer />
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default BrandPage;
