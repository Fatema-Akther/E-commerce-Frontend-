'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCardGrid from "./components/ProductCardGrid";
import NewsletterSection from "./components/NewsletterSection";
import InfoFeatures from "./components/InfoFeatures";
import Fasionarrival from "./components/Fasionarrival";
import Productgrid from "./components/productgrid";
import ProductGridWithDrawer from "./components/ProductGridWithDrawer";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    "/images/banner10.png",
    "/images/banner3.png",
    "/images/banner8.png",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

     {/* Main Slider Section with Side Banners */}
<div className="relative flex flex-col sm:flex-row justify-between items-center w-full" style={{ background: 'linear-gradient(135deg, #f56a79, #f2c94c)' }}>
  {/* ✅ Main Banner with Slide */}
  <div className="relative overflow-hidden w-full sm:w-[1000px] h-[300px] sm:h-[500px]">
    <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {banners.map((banner, index) => (
        <div key={index} className="flex-shrink-0 w-full h-full relative">
          <img
            src={banner}
            alt={`Banner ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>

    {/* ✅ Text Overlay */}
    <div className="absolute top-[45%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 text-left pl-4 z-10">
      <div className="text-2xl sm:text-4xl text-black font-mono">EXTRA</div>
      <div className="text-3xl sm:text-6xl font-extrabold text-white">SALE</div>
      <div className="text-xl sm:text-3xl text-black">30% OFF</div>

      <div className="mt-4">
        {/* Flip SHOP NOW Button */}
        <div className="relative w-[150px] sm:w-[180px] h-[45px] sm:h-[50px] [perspective:1000px]">
          <div className="relative w-full h-full animate-flipX [transform-style:preserve-3d]">

        
            {/* Front*/} 
            <div className="absolute inset-0 bg-gradient-to-r from-[#FB513C] to-[#6A242E] flex items-center justify-center rounded-lg text-white text-lg font-semibold backface-hidden">
              SHOP NOW
            </div>
            {/* Back*/}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FB513C] to-[#6A242E] flex items-center justify-center rounded-lg text-white text-lg font-semibold backface-hidden rotate-x-180">
              SHOP NOW
            </div> 


          </div>
        </div>
      </div>
    </div>

    {/* Slider Arrows */}
    <button
      onClick={prevSlide}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
    >
      &#10094;
    </button>
    <button
      onClick={nextSlide}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
    >
      &#10095;
    </button>

    {/* Dot Navigation */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {banners.map((_, index) => (
        <div
          key={index}
          onClick={() => handleDotClick(index)}
          className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-[rgb(245,106,121)]' : 'bg-[rgb(186,112,117)]'}`}
        ></div>
      ))}
    </div>
  </div>

  {/* ✅ Side Banners - Desktop Only */}
  <div className="hidden sm:flex flex-col space-y-4 right-0 top-0">
    <div className="sideBanner w-[490px] h-[240px] overflow-hidden">
      <img src="/images/side-banner7.jpg" alt="Side Banner 1" className="object-cover w-full h-full" />
    </div>
    <div className="sideBanner w-[490px] h-[240px] overflow-hidden">
      <img src="/images/side-banner10.jpg" alt="Side Banner 2" className="object-cover w-full h-full" />
    </div>
  </div>
</div>

      {/* Other Sections */}
     <ProductGridWithDrawer />

      <Fasionarrival />
          <section className="py-6 bg-white -mt-12">
           <ProductGridWithDrawer />
</section>
      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto"></div>
      </main>

      <NewsletterSection />
      <InfoFeatures />
      <Footer />
    </div>
  );
}
