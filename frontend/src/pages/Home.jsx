import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaUserNurse, FaClock, FaBabyCarriage, FaHome, FaExclamationTriangle, FaChild } from 'react-icons/fa';
import { gsap } from 'gsap';

const Home = () => {
  const characterRef = useRef(null);
  const faqRef = useRef([]);
  const isHeroInView = useInView(characterRef, { once: true });
  const [faqOpen, setFaqOpen] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animation for the character carrying "Connecting" text
    gsap.fromTo(
      characterRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" }
    );
  }, []);

  // Toggle function for FAQ items
  const toggleFAQ = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Function to navigate to Babysitter.jsx
  const handleBookNow = () => {
    navigate('/babysitter');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-r from-indigo-300 to-indigo-600 text-white rounded-lg shadow-lg p-10 mx-10 mt-10"
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        ref={characterRef}
      >
        <div className="flex-1 flex flex-col items-start justify-center space-y-6">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Caring Nanny
          </motion.h1>

          {/* Description of Caring Nanny */}
          <div className="text-lg font-medium">
            <p>
              Caring Nanny is a trusted platform that connects families with experienced and
              reliable caregivers. Whether you need a full-time nanny, part-time help, or occasional
              babysitting services, we’ve got you covered.
            </p>
          </div>

          <div className="text-2xl font-semibold">
            👩‍👧 <span className="text-white">Connecting Families & Caregivers</span>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="mt-4 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Book Now
          </button>
        </div>

        {/* Right Side with Nanny Image */}
        <motion.div
          className="flex-1 relative mt-8 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/nanny.webp"
            alt="Nanny"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Services We Provide Section */}
      <motion.div
        className="py-16 mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">Services We Provide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-10 md:px-20">
          {[ 
            { title: "Full-Time Nanny", description: "Dedicated childcare throughout the day.", icon: <FaUserNurse size={40} /> },
            { title: "Part-Time Nanny", description: "Flexible part-time nanny services.", icon: <FaClock size={40} /> },
            { title: "Occasional Babysitting", description: "Reliable babysitters for occasional needs.", icon: <FaBabyCarriage size={40} /> },
            { title: "Overnight Care", description: "Overnight nanny services for extended hours.", icon: <FaHome size={40} /> },
            { title: "Emergency Childcare", description: "Immediate childcare support in case of emergencies.", icon: <FaExclamationTriangle size={40} /> },
            { title: "Special Needs Care", description: "Experienced nannies for children with special needs, offering dedicated and compassionate care.", icon: <FaChild size={40} /> }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="bg-white border rounded-lg p-6 shadow-md max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-indigo-700 mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="py-16 mt-20 bg-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6 px-10 md:px-20 max-w-3xl mx-auto">
          {[ 
            { question: "What is Caring Nanny?", answer: "A platform connecting families with trusted nannies." },
            { question: "How does the vetting process work?", answer: "Through background checks and interviews." },
            { question: "Can I book a part-time nanny?", answer: "Yes, based on your schedule." },
            { question: "What is the cancellation policy?", answer: "Flexible cancellation with advance notice." },
            { question: "How do I contact customer support?", answer: "Available 24/7 via website or helpline." }
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              ref={(el) => (faqRef.current[index] = el)}
            >
              <h3
                className="text-xl font-semibold text-indigo-600 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </h3>
              {faqOpen[index] && (
                <motion.p
                  className="text-gray-700 mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;

