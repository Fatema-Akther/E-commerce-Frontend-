import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
   <footer className="bg-rose-500 text-white px-6 pt-10 pb-4">


  <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">


        {/* FIND US */}
        <div>
          <h4 className="text-base font-bold mb-4 uppercase">Find Us</h4>
          <p className="flex items-start gap-2 mb-2">
            <MdLocationOn className="mt-1" />
            <span>
              45-50 Gulberg III Industrial Area<br />
              Lahore, Pakistan<br />
              Sheikhupura Textile Mills Ltd
            </span>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <MdPhone /> 042-111-111-009<br />
          </p>
          <p className="text-xs mb-2 ml-6">(10AM to 5.30PM) Mon to Sat</p>
          <p className="flex items-center gap-2 mb-2">
            <FaWhatsapp /> +92 302 8141555
          </p>
          <p className="text-xs mb-2 ml-6">(10AM to 5.30PM) Mon to Sat</p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> sales@crosstitch.pk
          </p>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 className="text-base font-bold mb-4 uppercase">Customer Care</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Store Locations</a></li>
            <li><a href="#" className="hover:underline">Policies</a></li>
            <li><a href="#" className="hover:underline">Ordering & Tracking</a></li>
            <li><a href="#" className="hover:underline">Wholesale</a></li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h4 className="text-base font-bold mb-4 uppercase">Information</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Payment Method</a></li>
            <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">COVID-19 Policy</a></li>
          </ul>
        </div>

        {/* ABOUT US */}
        <div>
          <h4 className="text-base font-bold mb-4 uppercase">About Us</h4>
          <ul className="space-y-2 mb-4">
            <li><a href="#" className="hover:underline">The Brand</a></li>
            <li><a href="#" className="hover:underline">Shipping Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
          <div className="flex items-center gap-4 text-xl">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaXTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-xs text-center text-white">
        <p>© 2025 Peachmode · All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
