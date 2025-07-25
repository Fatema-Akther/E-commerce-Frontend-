'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';

type Product = {
  id: number;
  image: string[];
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  category: string;
  brand:string;
      features:string[];
      ShortDescription:string[];
      LongDescription:string[]
};

const allProducts: Product[] = [
  {
   id: 1,
     
    brand: 'sss',
    category: 'Sarees',
    image: [
  '/images/product1.jpg',
 '/images/product1.jpg',
 '/images/product1.jpg'
],

    title: 'Floaty Lavender Floral Print Maxi Dress',
    price: 'Tk 2,149.02',
    oldPrice: 'Tk 3,152.57',
    discount: 'SAVE 32%',
features: [
      '100% Original Product',
      'Express Shipping',
      'Cash on Delivery Available',
      'Easy return and exchange within 4 days'
    ],
   ShortDescription:['Product Type: Unstitched Georgette salwar kameez',

'Main Material: Weightless Georgette embroidery work',
'Dupatta: Waightless Georgette embroidery work',

'Work : embroidery work.',

'Salwar : butterfly fabrics',

'Look : 100 % like as catelogue.',

'Product condition: unstitched.',

'Free Size Body And Long',

'Hevy embroidery work',

'Quality : High quality product',

'Stylish and fashionable'

   ],

LongDescription:['New & Fashionable Collection',
'Unstitched',
'Sequence & Embroidery Work Four Piece',
'Body Fabrics : Georgette',
'Dupatta: Georgette',
'Shalwar : Butter Silk',
'Inner: Butter Silk',
'Body Long : 46+',
'Body: Free Size',
'100% Color and Quality Dress',
'Color As same picture.'

]

  },
  {
    id: 2,
    brand: 'sss',
    category: 'Sarees',
    image: ['/images/product12.jpg',
     '/images/product1.jpg',
 '/images/product2.jpg'
    ],
    title: 'Casual Chic Rayon Mustard A-Line Top',
    price: 'Tk 1,002.11',
    oldPrice: 'Tk 1,432.20',
    discount: 'SAVE 30%',
     features: [
      '100% Original Product',
      'Express Shipping',
      'Cash on Delivery Available',
      'Easy return and exchange within 3 days'
    ],
    

   ShortDescription:['Product Type: Unstitched Georgette salwar kameez',

'Main Material: Weightless Georgette embroidery work',
'Dupatta: Waightless Georgette embroidery work',

'Work : embroidery work.',

'Salwar : butterfly fabrics',

'Look : 100 % like as catelogue.',

'Product condition: unstitched.',

'Free Size Body And Long',

'Hevy embroidery work',

'Quality : High quality product',

'Stylish and fashionable'

   ],

    LongDescription:['New & Fashionable Collection',
'Unstitched',
'Sequence & Embroidery Work Four Piece',
'Body Fabrics : Georgette',
'Dupatta: Georgette',
'Shalwar : Butter Silk',
'Inner: Butter Silk',
'Body Long : 46+',
'Body: Free Size',
'100% Color and Quality Dress',
'Color As same picture.'

]
  },
  {
    id: 3,
    brand: 'aa',
    category: 'salwar',
    image: ['/images/product3.jpg',
      '/images/product1.jpg',
 '/images/product1.jpg'
    ],
    title: 'Graceful Light Orange Straight Salwar',
    price: 'Tk 4,729.57',
    oldPrice: 'Tk 7,166.76',
    discount: 'SAVE 34%',
    features: [
      '100% Original Product',
      'Express Shipping',
      'Cash on Delivery Available',
      'Easy return and exchange within 3 days'
    ],

    ShortDescription:['Product Type: Unstitched Georgette salwar kameez',

'Main Material: Weightless Georgette embroidery work',
'Dupatta: Waightless Georgette embroidery work',

'Work : embroidery work.',

'Salwar : butterfly fabrics',

'Look : 100 % like as catelogue.',

'Product condition: unstitched.',

'Free Size Body And Long',

'Hevy embroidery work',

'Quality : High quality product',

'Stylish and fashionable'

   ],

    LongDescription:['New & Fashionable Collection',
'Unstitched',
'Sequence & Embroidery Work Four Piece',
'Body Fabrics : Georgette',
'Dupatta: Georgette',
'Shalwar : Butter Silk',
'Inner: Butter Silk',
'Body Long : 46+',
'Body: Free Size',
'100% Color and Quality Dress',
'Color As same picture.'

]
  },
  {
    id: 4,
    brand: 'aa',
    category: 'kurta',
    image: ['/images/product14.jpg',
      '/images/product1.jpg',
 '/images/product1.jpg'
    ],
    title: 'Leaf Motif Printed Pure Cotton Straight Kurta',
    price: 'Tk 3,152.57',
    oldPrice: 'Tk 4,586.21',
    discount: 'SAVE 31%',
     features: [
      '100% Original Product',
      'Express Shipping',
      'Cash on Delivery Available',
      'Easy return and exchange within 3 days'
    ],
    ShortDescription:['Product Type: Unstitched Georgette salwar kameez',

'Main Material: Weightless Georgette embroidery work',
'Dupatta: Waightless Georgette embroidery work',

'Work : embroidery work.',

'Salwar : butterfly fabrics',

'Look : 100 % like as catelogue.',

'Product condition: unstitched.',

'Free Size Body And Long',

'Hevy embroidery work',

'Quality : High quality product',

'Stylish and fashionable'

   ],

    LongDescription:['New & Fashionable Collection',
'Unstitched',
'Sequence & Embroidery Work Four Piece',
'Body Fabrics : Georgette',
'Dupatta: Georgette',
'Shalwar : Butter Silk',
'Inner: Butter Silk',
'Body Long : 46+',
'Body: Free Size',
'100% Color and Quality Dress',
'Color As same picture.'

]
  },
  {
    id: 5,
    brand: 'sss',
    category: 'salwar',
    image: ['/images/product17.jpg',
      '/images/product1.jpg',
 '/images/product1.jpg'
    ],
    title: 'Graceful Light Orange Straight Salwar',
    price: 'Tk 4,729.57',
    oldPrice: 'Tk 7,166.76',
    discount: 'SAVE 34%',
      features: [
      '100% Original Product',
      'Express Shipping',
      'Cash on Delivery Available',
      'Easy return and exchange within 3 days'
    ],

     ShortDescription:['Product Type: Unstitched Georgette salwar kameez',

'Main Material: Weightless Georgette embroidery work',
'Dupatta: Waightless Georgette embroidery work',

'Work : embroidery work.',

'Salwar : butterfly fabrics',

'Look : 100 % like as catelogue.',

'Product condition: unstitched.',

'Free Size Body And Long',

'Hevy embroidery work',

'Quality : High quality product',

'Stylish and fashionable'

   ],

    LongDescription:['New & Fashionable Collection',
'Unstitched',
'Sequence & Embroidery Work Four Piece',
'Body Fabrics : Georgette',
'Dupatta: Georgette',
'Shalwar : Butter Silk',
'Inner: Butter Silk',
'Body Long : 46+',
'Body: Free Size',
'100% Color and Quality Dress',
'Color As same picture.'

]
  },
  {
    id: 6,
    brand: 'sss',
    category: 'Sarees',
    image: ['/images/product15.jpg',
      '/images/product1.jpg',
 '/images/product1.jpg'
    ],
    title: 'Casual Chic Rayon Mustard A-Line Top',
    price: 'Tk 1,002.11',
    oldPrice: 'Tk 1,432.20',
    discount: 'SAVE 30%',
      features: [
      '100% Original Product',
      'Express Shipping',
      'Cash on Delivery Available',
      'Easy return and exchange within 3 days'
    ],

     ShortDescription:['Product Type: Unstitched Georgette salwar kameez',

'Main Material: Weightless Georgette embroidery work',
'Dupatta: Waightless Georgette embroidery work',

'Work : embroidery work.',

'Salwar : butterfly fabrics',

'Look : 100 % like as catelogue.',

'Product condition: unstitched.',

'Free Size Body And Long',

'Hevy embroidery work',

'Quality : High quality product',

'Stylish and fashionable'

   ],
    LongDescription:['New & Fashionable Collection',
'Unstitched',
'Sequence & Embroidery Work Four Piece',
'Body Fabrics : Georgette',
'Dupatta: Georgette',
'Shalwar : Butter Silk',
'Inner: Butter Silk',
'Body Long : 46+',
'Body: Free Size',
'100% Color and Quality Dress',
'Color As same picture.'

]
  },
  {
    id: 7,
    brand: 'sss',
    category: 'Sarees',
    image: ['/images/product16.jpg',
      '/images/product1.jpg',
 '/images/product1.jpg'
    ],
    title: 'Floaty Lavender Floral Print Maxi Dress',
    price: 'Tk 2,149.02',
    oldPrice: 'Tk 3,152.57',
    discount: 'SAVE 32%',
     features: [
      '100% Original Product',
      'Express Shipping',
      'Cash on Delivery Available',
      'Easy return and exchange within 3 days'
    ],

     ShortDescription:['Product Type: Unstitched Georgette salwar kameez',

'Main Material: Weightless Georgette embroidery work',
'Dupatta: Waightless Georgette embroidery work',

'Work : embroidery work.',

'Salwar : butterfly fabrics',

'Look : 100 % like as catelogue.',

'Product condition: unstitched.',

'Free Size Body And Long',

'Hevy embroidery work',

'Quality : High quality product',

'Stylish and fashionable'

   ],

    LongDescription:['New & Fashionable Collection',
'Unstitched',
'Sequence & Embroidery Work Four Piece',
'Body Fabrics : Georgette',
'Dupatta: Georgette',
'Shalwar : Butter Silk',
'Inner: Butter Silk',
'Body Long : 46+',
'Body: Free Size',
'100% Color and Quality Dress',
'Color As same picture.'

]
  },


];

const Productgrid = ({ selectedCategory = 'all' }: { selectedCategory?: string }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (selectedCategory === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(
        allProducts.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
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

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-white py-12 relative">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          {selectedCategory.toUpperCase()} Latest Collection
        </h2>

        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
          >
            <FaChevronLeft />
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide px-1 scroll-smooth"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group min-w-[250px] relative bg-white border rounded shadow-lg overflow-hidden"
              >
                {/* Discount badge */}
                <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}
                </span>

                {/* Product image */}
                <Link href={`/product/${product.id}`}>
                  <div className="overflow-hidden relative">
                    <Image
                     src={product.image?.[0] || '/images/placeholder.jpg'}
                      alt={product.title}
                      width={500}
                      height={400}
                      className="w-full h-[300px] object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Product info */}
                <div className="p-4 flex flex-col justify-between">
                  <Link href={`/product/${product.id}`}>
                    <p className="text-sm text-gray-800 font-semibold truncate hover:text-rose-500">
                      {product.title}
                    </p>
                  </Link>
                  <div className="mt-2 flex items-center">
                    <span className="text-rose-600 font-semibold text-lg mr-2">
                      {product.price}
                    </span>
                    <span className="line-through text-sm text-gray-500">
                      {product.oldPrice}
                    </span>
                  </div>
                </div>

               <button
                      onClick={(e) => {
                        e.preventDefault(); // prevent link navigation
                        handleAddToCart(product);
                      }}
                      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm px-18 py-1 rounded opacity-0 transition-opacity duration-300 hover:opacity-100"
                    >
                      Add to Cart
                    </button>
              </div>
            ))}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
          >
            <FaChevronLeft className="rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Productgrid;
