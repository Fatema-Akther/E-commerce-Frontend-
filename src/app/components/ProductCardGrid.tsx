'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { allProducts, Product } from '../data/products';

type Props = {
  selectedCategory?: string | string[];
  selectedBrand?: string | string[]; // ✅ supports multiple brand filtering
  onAddToCart: (product: Product) => void;
  isVertical?: boolean;
  products?: Product[]; // ✅ filtered product list from parent
};

const ProductCardGrid = ({
  selectedCategory = 'all',
  selectedBrand = '',
  onAddToCart,
  isVertical = false,
  products,
}: Props) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    // ✅ Use filtered products from parent if available
    if (products && products.length > 0) {
      setFilteredProducts(products);
      return;
    }

    // ✅ Fallback filtering by category and brand
    let filtered = [...allProducts];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      if (Array.isArray(selectedCategory)) {
        filtered = filtered.filter((product) =>
          selectedCategory.some(
            (cat) =>
              cat.toLowerCase().trim() ===
              product.category.toLowerCase().trim()
          )
        );
      } else {
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim()
        );
      }
    }

    // Brand filter
    if (selectedBrand) {
      if (Array.isArray(selectedBrand)) {
        filtered = filtered.filter((product) =>
          selectedBrand.some(
            (brand) =>
              brand.toLowerCase().trim() ===
              product.brand.toLowerCase().trim()
          )
        );
      } else {
        filtered = filtered.filter(
          (product) =>
            product.brand.toLowerCase().trim() ===
            selectedBrand.toLowerCase().trim()
        );
      }
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
<section className="bg-white pt-2 sm:pt-4 pb-8 sm:pb-12">

      {/* Heading */}
      <div className="w-full px-4">
        <div className="max-w-screen-2xl mx-auto">
<h2 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black text-center mb-2 sm:mb-6">

            {Array.isArray(selectedCategory)
              ? selectedCategory.join(', ').toUpperCase()
              : selectedCategory?.toUpperCase() || 'ALL'}{' '}
            COLLECTION
          </h2>
        </div>
      </div>

      {/* Grid Wrapper */}
      <div className="relative w-full px-4">
        {/* Arrows for horizontal only */}
        {!isVertical && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className={
            isVertical
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4'
              : 'flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth'
          }
        >
          {filteredProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={`${product.id}-${product.title}`}
              className={
                isVertical
                  ? 'w-full'
                  : 'min-w-[280px] max-w-[280px] flex-shrink-0'
              }
            >
              <div className="bg-white border rounded-2xl shadow-lg overflow-hidden relative">
                <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}
                </span>

                {/* Image */}
                <div
                  className={`overflow-hidden relative ${
                    isVertical ? 'aspect-[3/4]' : ''
                  }`}
                >
                  <Image
                    src={product.image?.[0] || '/images/placeholder.jpg'}
                    alt={product.title}
                    width={isVertical ? undefined : 500}
                    height={isVertical ? undefined : 600}
                    fill={isVertical}
                    className={`${
                      isVertical
                        ? 'object-cover w-full h-full'
                        : 'w-full h-[500px] object-cover'
                    } transition-all duration-300 ease-in-out transform hover:scale-105`}
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onAddToCart(product);
                    }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm px-12 py-3 rounded opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between">
                  <p className="text-sm text-gray-800 font-semibold truncate">
                    {product.title}
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-rose-600 font-semibold text-lg mr-2">
                      {product.price}
                    </span>
                    <span className="line-through text-sm text-gray-500">
                      {product.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCardGrid;
