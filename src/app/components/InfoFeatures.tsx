'use client';

import { FaBoxOpen, FaPhoneAlt, FaLock, FaPaperPlane } from 'react-icons/fa';

const InfoFeatures = () => {
  return (
    <section className="bg-rose-400 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {/* Feature 1 */}
        <div>
          <FaBoxOpen className="text-3xl mx-auto mb-4" />
          <h4 className="font-semibold uppercase mb-2">Free Shipping</h4>
          <p className="text-sm">Free shipping in India</p>
        </div>

        {/* Feature 2 */}
        <div>
          <FaPhoneAlt className="text-3xl mx-auto mb-4" />
          <h4 className="font-semibold uppercase mb-2">Customer Service</h4>
          <p className="text-sm">
            We are available from Monday to Saturday<br />
            (9AM - 6PM)
          </p>
        </div>

        {/* Feature 3 */}
        <div>
          <FaLock className="text-3xl mx-auto mb-4" />
          <h4 className="font-semibold uppercase mb-2">Secure Payment</h4>
          <p className="text-sm">Your payment information is processed securely.</p>
        </div>

        {/* Feature 4 */}
        <div>
          <FaPaperPlane className="text-3xl mx-auto mb-4" />
          <h4 className="font-semibold uppercase mb-2">Contact Us</h4>
          <p className="text-sm">
            Need to contact us? Just send us an email at <br />
            contact@peachmode.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoFeatures;
