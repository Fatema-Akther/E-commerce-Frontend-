'use client';

import { useState, useEffect, JSX } from 'react';
import Image from 'next/image';
import {
  FaCheckCircle,
  FaShippingFast,
  FaMoneyBillAlt,
  FaUndoAlt,
} from 'react-icons/fa';

type Product = {
  id: number;
  image: string[];
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  category: string;
  brand: string;
  features: string[];
  ShortDescription: string[];
  LongDescription: string[];
};

// ✅ Extended Product with quantity
type CartProduct = Product & { quantity: number };

const SingleProductDetails = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: () => void;
}) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image[0]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const handleAddToCart = () => {
    const exists = cart.find((item) => item.id === product.id);
    let updatedCart: CartProduct[];

    if (exists) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    onAddToCart(); // Open cart drawer if needed
  };

  const featureIconMap: { [key: string]: JSX.Element } = {
    '100% Original Product': <FaCheckCircle className="text-green-500 mr-2" />,
    'Express Shipping': <FaShippingFast className="text-blue-500 mr-2" />,
    'Cash on Delivery Available': <FaMoneyBillAlt className="text-yellow-500 mr-2" />,
    'Easy return and exchange within 3 days': <FaUndoAlt className="text-purple-500 mr-2" />,
  };

  return (
    <div className="flex flex-col md:flex-row gap-16">
      {/* ✅ Image Section */}
    <div className="flex flex-col md:flex-row w-full md:w-1/2 gap-4">
  {/* ✅ Main Image — comes first on mobile, stays left on desktop */}
  <div className="relative w-full md:w-[500px] lg:w-[600px] aspect-[3/4] rounded-lg overflow-hidden md:order-1 order-1">
    <Image
      src={selectedImage}
      alt={product.title}
      fill
      className="object-cover"
    />
  </div>

  {/* ✅ Thumbnails — comes after on mobile, stays right on desktop */}
  <div className="flex md:flex-col flex-row gap-2 md:overflow-y-auto overflow-x-auto md:max-h-[600px] md:w-[140px] w-full md:order-2 order-2">
    {product.image.map((img, idx) => (
      <Image
        key={idx}
        src={img}
        alt={`Thumbnail ${idx}`}
        width={100}
        height={100}
        onClick={() => setSelectedImage(img)}
        className={`cursor-pointer rounded-md border-2 object-cover ${
          selectedImage === img ? 'border-black' : 'border-transparent'
        }`}
      />
    ))}
  </div>
</div>

      {/* ✅ Product Info Section */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-black mb-4">{product.title}</h1>
        <p className="text-rose-600 text-2xl font-bold mb-1">{product.price}</p>
        <p className="line-through text-gray-500 mb-3">{product.oldPrice}</p>
        <p className="mb-2 text-sm text-gray-600">Category: {product.category}</p>

        {/* Quantity Controls */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="border px-3 py-1 text-black"
          >
            -
          </button>
          <span className="border-t border-b px-4 py-1 text-black">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="border px-3 py-1 text-black"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-pink-600 text-white py-2 rounded mb-4"
        >
          অর্ডার করুন
        </button>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center text-gray-700 text-sm">
              {featureIconMap[feature]}
              {feature}
            </div>
          ))}
        </div>

        {/* Short Description */}
        <div className="border-t pt-4 mb-4">
          <details>
            <summary className="font-semibold cursor-pointer text-black">
              Short Description
            </summary>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
              {product.ShortDescription?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </details>
          {product.ShortDescription?.[0] && (
            <p className="text-sm text-gray-500 mt-2 ml-1 italic">
              {product.ShortDescription[0].slice(0, 80)}...
            </p>
          )}
        </div>

        {/* Long Description */}
        <div className="border-t pt-4 mb-4">
          <details>
            <summary className="font-semibold cursor-pointer text-black">
              Long Description
            </summary>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
              {product.LongDescription?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </details>
          {product.ShortDescription?.[0] && (
            <p className="text-sm text-gray-500 mt-2 ml-1 italic">
              {product.ShortDescription[0].slice(0, 80)}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
