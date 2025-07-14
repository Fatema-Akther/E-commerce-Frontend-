'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  image: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  category: string;
};

const allProducts: Product[] = [
  {
    id: 1,
    category: 'Sarees',
    image: '/images/product16.jpg',
    title: 'Floaty Lavender Floral Print Maxi Dress',
    price: 'Tk 2,149.02',
    oldPrice: 'Tk 3,152.57',
    discount: 'SAVE 32%',
  },
  {
    id: 2,
    category: 'saree',
    image: '/images/product15.jpg',
    title: 'Casual Chic Rayon Mustard A-Line Top',
    price: 'Tk 1,002.11',
    oldPrice: 'Tk 1,432.20',
    discount: 'SAVE 30%',
  },
  {
    id: 3,
    category: 'salwar',
    image: '/images/product17.jpg',
    title: 'Graceful Light Orange Straight Salwar',
    price: 'Tk 4,729.57',
    oldPrice: 'Tk 7,166.76',
    discount: 'SAVE 34%',
  },
  {
    id: 4,
    category: 'kurta',
    image: '/images/product14.jpg',
    title: 'Leaf Motif Printed Pure Cotton Straight Kurta',
    price: 'Tk 3,152.57',
    oldPrice: 'Tk 4,586.21',
    discount: 'SAVE 31%',
  },
];

const Productgrid = ({ selectedCategory = 'all' }: { selectedCategory?: string }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (selectedCategory === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      ));
    }
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert('Already in cart!');
      return;
    }
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          {selectedCategory.toUpperCase()} COLLECTION
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative bg-white border rounded shadow-lg overflow-hidden">
              {/* Discount badge */}
              <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {product.discount}
              </span>

              {/* Product image with link */}
              <Link href={`/product/${product.id}`}>
                <div className="overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={400}
                    className="w-full h-[400px] object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between">
                <Link href={`/product/${product.id}`}>
                  <p className="text-sm text-gray-800 font-semibold truncate hover:text-rose-500">
                    {product.title}
                  </p>
                </Link>
                <div className="mt-2 flex items-center">
                  <span className="text-rose-600 font-semibold text-lg mr-2">{product.price}</span>
                  <span className="line-through text-sm text-gray-500">{product.oldPrice}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white text-sm px-4 py-2 rounded opacity-0 transition-opacity duration-300 hover:opacity-100"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Productgrid;
