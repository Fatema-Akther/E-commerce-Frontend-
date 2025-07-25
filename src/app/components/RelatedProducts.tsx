'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Product = {
  id: number;
  image: string[];
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  category: string;
  brand: string;
};

const RelatedProducts = ({
  allProducts,
  currentId,
  currentCategory,
}: {
  allProducts: Product[];
  currentId: number;
  currentCategory: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const relatedProducts = allProducts.filter(
    (p) => p.category === currentCategory && p.id !== currentId
  );

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const handleAddToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) return alert('Already in cart!');
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    alert('Added to cart!');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (!relatedProducts.length) return null;

  const showArrows = relatedProducts.length > 4;

  return (
    <section className="w-full py-12">
      <div className="pl-8 pr-4">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">You may also like</h2>

        <div className="relative">
          {/* Left Arrow */}
          {showArrows && (
            <button
              onClick={() => scroll('left')}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide"
          >
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                className="min-w-[340px] max-w-[340px] flex-shrink-0 bg-white border rounded-2xl shadow p-4"
              >
                <Link href={`/product/${rp.id}`}>
                  <Image
                    src={rp.image?.[0] || '/images/placeholder.jpg'}
                    alt={rp.title}
                    width={340}
                    height={340}
                    className="w-full h-[340px] object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold text-sm truncate text-black">
                    {rp.title}
                  </h3>
                </Link>
                <p className="text-rose-600 font-semibold">{rp.price}</p>
                <p className="text-xs text-gray-500 mb-2">{rp.discount}</p>
                <button
                  onClick={() => handleAddToCart(rp)}
                  className="bg-black text-white text-sm px-4 py-2 rounded w-full"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showArrows && (
            <button
              onClick={() => scroll('right')}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
