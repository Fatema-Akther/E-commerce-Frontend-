'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoFeatures from '../components/InfoFeatures';

type FormState = {
  firstName: string;
  address: string;
  city: string;
  phone: string;
  note: string;
};

type Product = {
  id: number;
  image: string[];
  title: string;
  price: string;
  quantity?: number;
};

export default function CheckoutForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    firstName: '',
    address: '',
    city: '',
    phone: '',
    note: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { [key: string]: string } = {};

    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.phone) newErrors.phone = 'Phone is required';

    if (selectedProducts.length === 0) {
      toast.error('No product selected!');
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => {
        toast.error(error);
      });
      return;
    }

    sessionStorage.setItem('from_checkout', 'true');
    router.push('/thankyou');
  };

  useEffect(() => {
    const stored = localStorage.getItem('singleOrderItem');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedProducts(Array.isArray(parsed) ? parsed : [parsed]);
    }
    sessionStorage.removeItem('from_checkout');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

 <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto w-full px-2 py-6">


        {/* 🧾 Left: Form Section */}
        <form
          onSubmit={handleSubmit}
         className="col-span-6 md:col-span-5 space-y-4"
        >
          <h3 className="text-xl font-bold mb-4 text-black">
            অর্ডার কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে অর্ডার কনফার্ম করুন।
          </h3>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-black">আপনার ফোন নাম্বার*</label>
            <input
  name="phone"
  type="number"
  value={form.phone}
  onChange={handleChange}
  className={`w-full border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-black ${
    errors.phone ? 'border-red-500' : 'border-gray-300'
  } appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
/>

            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-black">আপনার নাম*</label>
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-black ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Full Name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium text-black">আপনার ডেলিভারি ঠিকানা দিন*</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className={`w-full border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-black autofill:bg-white ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Delivery Address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block mb-1 font-medium text-black">ডেলিভারি এলাকা*</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-3 bg-white text-black ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Delivery Area</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
            </select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Note */}
          <div>
            <label className="block mb-1 font-medium text-black">গ্রাহক নোট (optional)</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded px-3 py-3 bg-white text-black"
              placeholder="Enter Your Note"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-3 rounded text-lg font-semibold"
          >
            অর্ডার কনফার্ম করুন
          </button>
        </form>

        {/* 🛒 Right: CartDrawer-style Selected Product Box */}
        {selectedProducts.length > 0 && (
          <div className="w-full md:w-[350px] h-fit bg-white shadow-md rounded-lg overflow-hidden border sticky top-4  md:ml-auto">
            <div className="p-4 border-b">
              <h3 className="text-lg font-bold text-black">
আপনার নির্বাচিত প্রোডাক্ট</h3>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
              {selectedProducts.map((item) => (
                <div key={item.id} className="flex gap-2 border-b pb-3">
                  <Image
                    src={item.image?.[0] || '/images/placeholder.jpg'}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black line-clamp-2">{item.title}</p>
                    <p className="text-pink-600 font-bold text-sm mt-1">{item.price}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity || 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <InfoFeatures />
      <Footer />
    </div>
  );
}


