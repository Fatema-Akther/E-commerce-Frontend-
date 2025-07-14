'use client';

import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import InfoFeatures from '@/app/components/InfoFeatures';
import ProductCardGrid from '@/app/components/ProductCardGrid';

const BrandPage = () => {
  const { brand } = useParams();

  const brandString = typeof brand === 'string' ? brand : brand?.[0] || 'all';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <ProductCardGrid selectedBrand={brandString} />

      <InfoFeatures />
      <Footer />
    </div>
  );
};

export default BrandPage;
