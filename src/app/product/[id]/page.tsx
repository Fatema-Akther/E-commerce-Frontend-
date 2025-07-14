import { notFound } from 'next/navigation';
import Image from 'next/image';

import Header from '@/app/components/Header';
import InfoFeatures from '@/app/components/InfoFeatures';
import Footer from '@/app/components/Footer';
import RelatedProducts from '@/app/components/RelatedProducts';
import { allProducts } from '@/app/data/products';
import SingleProductDetails from '@/app/components/SingleProductDetails';

type Props = {
  params: { id: string };
};

const ProductPage = async ({ params }: Props) => {
  const id = parseInt(params.id);
  const product = allProducts.find(p => p.id === id);

  if (!product) return notFound();

  function handleAddToCart(p: any): void {
    throw new Error('Function not implemented.');
  }



 


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={600}
            className="w-full object-cover rounded-lg"
          />
        </div>

        <SingleProductDetails product={product} />

      </main>

      {/* ✅ Related Products (Client Component) */}
      <RelatedProducts
        allProducts={allProducts}
        currentId={product.id}
        currentCategory={product.category}

        
      />
      

      <InfoFeatures />
      <Footer />
    </div>
  );
};

export default ProductPage;
