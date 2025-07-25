'use client';

import 'rc-slider/assets/index.css';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Header from '@/app/components/Header';
import InfoFeatures from '@/app/components/InfoFeatures';
import Footer from '@/app/components/Footer';
import ProductCardGrid from '@/app/components/ProductCardGrid';
import { allProducts, Product } from '@/app/data/products';
import CartDrawer from '@/app/components/CartDrawer';
import Slider from 'rc-slider';

const CategoryPage = () => {
  const { category } = useParams();

  let categoryString = 'all';
  if (typeof category === 'string') {
    categoryString = category.toLowerCase() === 'newarrivals' ? 'all' : category;
  } else if (Array.isArray(category) && category.length > 0) {
    const val = category[0].toLowerCase();
    categoryString = val === 'newarrivals' ? 'all' : val;
  }

  const allCategories = [
    'Women Clothing',
    'Sarees',
    'Jamdani Sharee',
    'salwar',
    'kurta',
    'Three Prics',
    'unstitched party dress',
    'Premium cotton',
    'Pakistani stitched dress',
  ];

  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setDrawerOpen(true);
  };

  const selectedCategoriesToFilter =
    checkedCategories.length > 0
      ? checkedCategories
      : categoryString === 'all'
      ? []
      : [categoryString];

  const handleCategoryChange = (cat: string) => {
    setCheckedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = allProducts
    .filter((product) => {
      if (selectedCategoriesToFilter.length === 0) return true;
      return selectedCategoriesToFilter
        .map((cat) => cat.toLowerCase())
        .includes(product.category.toLowerCase());
    })
    .filter((product) => {
      const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Minimal Mobile FILTERS Button */}
{/* Minimal FILTERS button with inline arrow */}
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
      <h3 className="text-sm font-bold mb-2 text-black">Filter by Sub-Category</h3>
      <div className="space-y-2 mb-4">
        {allCategories.map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm text-black">
            <input
              type="checkbox"
              checked={checkedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              className="accent-rose-500"
            />
            {cat}
          </label>
        ))}
      </div>

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

      <div className="flex flex-col md:flex-row w-full px-4 py-6 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-full md:w-[250px] h-fit sticky top-20 mt-10">
          <h3 className="text-lg font-bold mb-4 text-black">Filter by Sub-Category</h3>
          <div className="space-y-2 mb-6">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm text-black">
                <input
                  type="checkbox"
                  checked={checkedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="accent-rose-500"
                />
                {cat}
              </label>
            ))}
          </div>

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
            selectedCategory={[]}
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

export default CategoryPage;
