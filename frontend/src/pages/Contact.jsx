import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-white p-8 md:p-16 gap-12">
      {/* Left Image Section */}
      <div className="flex-1">
        <img 
          src="/contact.jpg" 
          alt="Contact Us" 
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Right Contact Cards Section */}
      <div className="flex flex-col flex-1 gap-8">
        {/* Section Title */}
        <div className="text-center lg:text-left mb-6">
          <h2 className="text-4xl font-bold text-blue-600">Connect with Caring Nanny</h2>
          <p className="text-lg text-gray-600 mt-2">
            Located at Symbiosis Institute of Technology (SIT) Campus
          </p>
        </div>

        {/* Contact Cards */}
        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-xl p-8 gap-6"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaPhone className="text-4xl text-blue-600" />
          <div>
            <p className="font-semibold text-lg">Phone Number</p>
            <p className="text-gray-700">+91 9991268863</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-xl p-8 gap-6"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaMapMarkerAlt className="text-4xl text-blue-600" />
          <div>
            <p className="font-semibold text-lg">Our Location</p>
            <p className="text-gray-700">
              Symbiosis Institute of Technology (SIT), Pune
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-xl p-8 gap-6"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaEnvelope className="text-4xl text-blue-600" />
          <div>
            <p className="font-semibold text-lg">E-mail ID</p>
            <p className="text-gray-700">support@caringnanny.com</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center bg-white shadow-lg rounded-xl p-8 gap-6"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          whileHover={{ scale: 1.05 }}
        >
          <FaWhatsapp className="text-4xl text-green-600" />
          <div>
            <p className="font-semibold text-lg">WhatsApp</p>
            <p className="text-gray-700">+91 9991268863</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;


