'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  quantity?: number;
}

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, [isOpen]);

  const updateQuantity = (id: number, action: 'increment' | 'decrement') => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = action === 'increment' ? (item.quantity || 1) + 1 : Math.max(1, (item.quantity || 1) - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-[350px] h-full bg-white shadow-lg transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg">Shopping Cart</h2>
        <button onClick={onClose} className="text-xl">&times;</button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-150px)]">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-2 mb-4 border-b pb-3">
            <Image src={item.image} alt={item.title} width={60} height={60} className="object-cover rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-2">{item.title}</p>
              <div className="text-xs text-gray-600 line-through">{item.oldPrice}</div>
              <div className="text-pink-600 font-bold">{item.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, 'decrement')} className="text-gray-600">-</button>
              <span>{item.quantity || 1}</span>
              <button onClick={() => updateQuantity(item.id, 'increment')} className="text-gray-600">+</button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm font-bold"
            >
              
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <p className="font-bold mb-2">Subtotal: <span className="float-right">৳ {subtotal.toLocaleString()}</span></p>
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-200 text-sm py-2 rounded">Clear All</button>
          <button className="flex-1 bg-rose-500 text-white text-sm py-2 rounded">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
