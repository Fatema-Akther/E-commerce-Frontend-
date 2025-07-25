'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function ThankYouPage() {
  const animationRef = useRef<number | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const fromCheckout = sessionStorage.getItem("from_checkout");

    // Only animate on direct navigate from checkout
    if (fromCheckout === "true") {
      setShouldAnimate(true);

      const duration = 800;
      const end = Date.now() + duration;

      function frame() {
        confetti({ particleCount: 150, angle: 60, spread: 100, origin: { x: 0 } });
        confetti({ particleCount: 150, angle: 120, spread: 100, origin: { x: 1 } });

        if (Date.now() < end) {
          animationRef.current = requestAnimationFrame(frame);
        }
      }

      frame();

      // Clear the flag so that back navigation won’t trigger it again
      sessionStorage.removeItem("from_checkout");
    }

    // Stop any animation on unmount
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 text-center max-w-md w-full border border-gray-200">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful 🎉</h1>
        <p className="text-gray-700 mb-4">Thank you! Your order has been successfully placed.</p>
        <p className="text-sm text-gray-500">You can continue shopping or return to the homepage.</p>
        <Link href="/" className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
