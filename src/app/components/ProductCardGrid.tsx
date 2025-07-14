'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { allProducts, Product } from '../data/products';



const ProductCardGrid = ({
  selectedCategory = 'all',
  selectedBrand = '',
}: {
  selectedCategory?: string;
  selectedBrand?: string;
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    let filtered = [...allProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) =>
        product.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand]);

  const handleAddToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) return alert('Already in cart!');
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          {selectedCategory.toUpperCase()} COLLECTION
        </h2>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide px-1 scroll-smooth"
          >
            {filteredProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={`${product.id}-${product.title}`}
                className="min-w-[280px] max-w-[280px] flex-shrink-0"
              >
                <div className="bg-white border rounded shadow-lg overflow-hidden relative">
                  <span className="absolute top-2 left-2 bg-rose-600 !text-black text-xs font-semibold px-2 py-1 rounded">
                    {product.discount}
                  </span>

                  <div className="overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={500}
                      height={600}
                      className="w-full h-[500px] object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // prevent link navigation
                        handleAddToCart(product);
                      }}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm px-12 py-3 rounded opacity-0 transition-opacity duration-300 hover:opacity-100"
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="p-4 flex flex-col justify-between">
                    <p className="text-sm text-gray-800 font-semibold truncate">{product.title}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-rose-600 font-semibold text-lg mr-2">{product.price}</span>
                      <span className="line-through text-sm text-gray-500">{product.oldPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCardGrid;
