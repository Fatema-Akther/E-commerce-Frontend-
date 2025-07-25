'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'sonner';

interface Product {
  id: number;
  image: string[];
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  quantity?: number;
}

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, [isOpen]);

  const updateQuantity = (id: number, action: 'increment' | 'decrement') => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity =
          action === 'increment'
            ? (item.quantity || 1) + 1
            : Math.max(1, (item.quantity || 1) - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div
        className="ml-auto w-[350px] h-full bg-white shadow-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg text-black">Shopping Cart</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-150px)]">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex gap-2 mb-4 border-b pb-3 transition rounded"
              >
                <Image
                  src={item.image?.[0] || '/images/placeholder.jpg'}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2 text-black">{item.title}</p>
                  <div className="text-xs text-gray-600 line-through">{item.oldPrice}</div>
                  <div className="text-pink-600 font-bold">{item.price}</div>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center gap-2 text-black">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, 'decrement');
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, 'increment');
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    }}
                    className="text-red-500 mt-2"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <p className="font-bold mb-2">
            Subtotal: <span className="float-right text-black">৳ {subtotal.toLocaleString()}</span>
          </p>
          <div className="flex gap-2 ">
            <button
              onClick={clearCart}
              className="flex-1 bg-gray-200 text-sm py-2 rounded text-black"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                if (cartItems.length === 0) {
                  toast.error('Your cart is empty.');
                  return;
                }
                localStorage.setItem('singleOrderItem', JSON.stringify(cartItems));
                onClose();
                router.push('/checkout');
              }}
              className="flex-1 bg-rose-500 text-white text-sm py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
