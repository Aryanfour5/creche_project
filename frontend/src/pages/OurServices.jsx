// src/pages/OurServices.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserNurse, FaClock, FaBabyCarriage, FaHome, FaExclamationTriangle, FaChild } from 'react-icons/fa'; // Import icons
import './OurServices.css'; // Import the new CSS file

const OurServices = () => {
  return (
    <motion.div
      className="services-container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="services-title">Services We Provide</h2>
      <div className="services-grid">
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
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="service-icon">
              {service.icon}
            </div>
            <h3 className="service-title-card">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurServices;
