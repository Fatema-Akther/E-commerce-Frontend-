'use client';

import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import InfoFeatures from '@/app/components/InfoFeatures';
import Footer from '@/app/components/Footer';
import ProductCardGrid from '@/app/components/ProductCardGrid';

const CategoryPage = () => {
  const { category } = useParams();
  const categoryString = typeof category === 'string' ? category : 'all';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProductCardGrid selectedCategory={categoryString} />
      <InfoFeatures />
      <Footer />
    </div>
  );
};

export default CategoryPage;
