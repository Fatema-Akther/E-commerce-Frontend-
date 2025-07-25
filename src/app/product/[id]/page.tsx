'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import Header from '@/app/components/Header';
import InfoFeatures from '@/app/components/InfoFeatures';
import Footer from '@/app/components/Footer';
import RelatedProducts from '@/app/components/RelatedProducts';

import SingleProductDetails from '@/app/components/SingleProductDetails';
import CartDrawer from '@/app/components/CartDrawer';
import React from 'react';
import { allProducts } from '@/app/data/products';

export default function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params); // 👈 unwrap the promise

  const id = parseInt(params.id);
  const product = allProducts.find((p) => p.id === id);

  if (!product) return notFound();
    const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
         
        </div>

        <SingleProductDetails
          product={product}
          onAddToCart={() => setDrawerOpen(true)}
        />
      </main>

      <RelatedProducts
        allProducts={allProducts}
        currentId={product.id}
        currentCategory={product.category}
      />

      <InfoFeatures />
      <Footer />

      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
