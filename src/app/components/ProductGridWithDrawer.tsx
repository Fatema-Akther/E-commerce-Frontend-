'use client';
import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import ProductCardGrid from './ProductCardGrid';
import CartDrawer from './CartDrawer';

// ✅ Extended type with quantity
interface CartProduct extends Product {
  quantity: number;
}

export default function ProductGridWithDrawer() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const handleAddToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);

    let updatedCart: CartProduct[];
    if (exists) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setDrawerOpen(true);
  };

  return (
    <>
      <ProductCardGrid onAddToCart={handleAddToCart} />
      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
