'use client';

import { useState, useEffect } from 'react';

type Product = {
  id: number;
  image: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  category: string;
};

const SingleProductDetails = ({ product }: { product: Product }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const handleAddToCart = () => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert('Already in cart!');
      return;
    }
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    alert('Added to cart!');
  };

  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-3xl font-bold text-black mb-4">{product.title}</h1>
      <p className="text-xl text-rose-600 font-semibold mb-2">{product.price}</p>
      <p className="line-through text-black mb-4">{product.oldPrice}</p>
      <p className="mb-4">{product.discount}</p>
      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SingleProductDetails;
