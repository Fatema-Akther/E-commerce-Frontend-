'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images?: string[];
}

export default function ProductImageGallery({ images = [] }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) {
    return null; // Or return a message like "No images available"
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-xl overflow-hidden w-full aspect-square relative">
        <Image
          src={selectedImage}
          alt="Selected product"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 cursor-pointer border rounded-md overflow-hidden relative ${
              selectedImage === img ? 'ring-2 ring-black' : ''
            }`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${idx}`} 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}