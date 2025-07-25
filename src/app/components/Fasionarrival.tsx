'use client';

import Image from 'next/image';
import Link from 'next/link';

const featuredProducts = [
  {
    id: 1,
    brand: 'sss',
    image: '/images/product8.jpg',
    title: 'Readymade Suits',
  },
  {
    id: 2,
    brand: 'aa',
    image: '/images/product10.jpg',
    title: 'Co-ords',
  },
  {
    id: 3,
    brand: 'sss',
    image: '/images/product12.jpg',
    title: 'Dresses',
  },

  {
    id: 4,
    brand: 'sss',
    image: '/images/product22.jpg',
    title: 'Dresses',
  },
  {
    id: 5,
    brand: 'sss',
    image: '/images/product23.jpg',
    title: 'Dresses',
  },

   {
    id: 6,
    brand: 'sss',
    image: '/images/product24.jpg',
    title: 'Dresses',
  },
];

const FashionArrivals = () => {
  return (
    <section className="py-6 bg-white -mt-10">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black  mb-2 sm:mb-6">Fashion Frenzy Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-3  sm:gap-6">
          {featuredProducts.map((product) => (
            <Link
              href={`/brand/${product.brand}`}
              key={product.id}
              className="relative group w-full h-96 overflow-hidden block"
            >
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-black bg-opacity-40">
                <p className="text-white text-xl font-semibold">{product.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionArrivals;
