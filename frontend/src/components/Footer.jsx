import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 mt-40">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14 text-sm">
        
        {/* About Section */}
        <div>
          <h1 className="mb-5 text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <FaHeart className="text-indigo-700" /> Caring Nanny
          </h1>
          <p className="text-gray-600 leading-relaxed">
            At Caring Nanny, we connect families with loving and qualified caregivers to ensure a safe
            and nurturing environment for your children.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-5 text-gray-800">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <NavLink to="/" className="hover:text-indigo-500 transition duration-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-indigo-500 transition duration-300">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="hover:text-indigo-500 transition duration-300">
                Our Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-indigo-500 transition duration-300">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy" className="hover:text-indigo-500 transition duration-300">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms-conditions" className="hover:text-indigo-500 transition duration-300">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-xl font-bold mb-5 text-gray-800">Contact Us</h2>
          <ul className="flex flex-col gap-4 text-gray-600">
            <li className="flex items-center gap-3">
              <FaPhone className="text-indigo-700" /> 
              <div>
                <p className="font-semibold">Call Us</p>
                <p>+91 98765 43210</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-700" /> 
              <div>
                <p className="font-semibold">Email Us</p>
                <p>info@medisync.in</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-700" /> 
              <div>
                <p className="font-semibold">Location</p>
                <p>Pune, Maharashtra</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <FaClock className="text-indigo-700" /> 
              <div>
                <p className="font-semibold">Hours</p>
                <p>Mon - Sat: 9AM - 7PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t pt-5 text-center text-gray-500 text-xs">
        <p>© 2024 Caring Nanny - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


