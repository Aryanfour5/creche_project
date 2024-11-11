import React from 'react';
import { FaHandsHelping, FaCalendarAlt, FaHeadset } from 'react-icons/fa';

const About = () => {
  return (
    <div className='flex flex-col items-center my-10 bg-white py-10'>

      {/* About Section Header */}
      <div className='text-center my-10'>
        <h2 className='text-4xl font-bold text-gray-800'>
          About <span className='text-indigo-600'>Caring Nanny</span>
        </h2>
        <p className='text-gray-600 mt-4 text-lg'>
          Revolutionizing childcare services with compassion and trust.
        </p>
      </div>

      {/* Statistics Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mx-4'>
        <div className='bg-gradient-to-b from-white to-indigo-100 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform'>
          <p className='text-3xl font-bold text-indigo-600'>5K+</p>
          <p className='text-gray-600'>Active Families</p>
        </div>
        <div className='bg-gradient-to-b from-white to-indigo-100 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform'>
          <p className='text-3xl font-bold text-indigo-600'>200+</p>
          <p className='text-gray-600'>Experienced Nannies</p>
        </div>
        <div className='bg-gradient-to-b from-white to-indigo-100 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform'>
          <p className='text-3xl font-bold text-indigo-600'>50+</p>
          <p className='text-gray-600'>Cities Served</p>
        </div>
      </div>

      {/* About Section with Image and Text */}
      <div className='flex flex-col md:flex-row items-center my-10 md:my-20 w-full px-4 md:w-3/4 lg:w-2/3'>
        {/* Image Section */}
        <div className='md:w-1/2'>
          <img src='/babbysitter.avif' alt='Healthcare Professionals' className='rounded-lg shadow-lg'/>
        </div>
        
        {/* Text Section */}
        <div className='md:w-1/2 md:pl-8'>
          <h3 className='text-3xl font-bold text-gray-800'>Transforming Childcare for a Better Tomorrow</h3>
          <p className='text-gray-600 mt-4'>
            At Caring Nanny, we’re committed to revolutionizing childcare by providing compassionate, trusted, and highly skilled caregivers. We believe in nurturing each child's unique needs and helping families feel confident and secure with their childcare choices.
          </p>
          <ul className='mt-6 space-y-3'>
            <li className='flex items-start'>
              <span className='text-indigo-600 mr-2'>✓</span> Extensive nanny vetting process
            </li>
            <li className='flex items-start'>
              <span className='text-indigo-600 mr-2'>✓</span> Customized childcare solutions
            </li>
            <li className='flex items-start'>
              <span className='text-indigo-600 mr-2'>✓</span> 24/7 support for families
            </li>
            <li className='flex items-start'>
              <span className='text-indigo-600 mr-2'>✓</span> Focus on child development
            </li>
          </ul>
        </div>
      </div>

      {/* Our Mission and Vision Cards */}
      <div className='flex flex-col md:flex-row gap-6 items-start md:items-stretch md:w-3/4 lg:w-2/3 my-6'>
        {/* Our Mission Card */}
        <div className='flex-1 border rounded-lg shadow-lg p-8 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <b className='text-indigo-600 text-xl'>Our Mission</b>
          <p className='text-gray-600 mt-2'>
            At Caring Nanny, our mission is to empower families by providing reliable and compassionate childcare solutions. We strive to create lasting relationships between families and nannies, ensuring peace of mind for parents and a safe, loving environment for children.
          </p>
        </div>

        {/* Our Vision Card */}
        <div className='flex-1 border rounded-lg shadow-lg p-8 bg-gradient-to-b from-blue-100 to-indigo-100 transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <b className='text-indigo-600 text-xl'>Our Vision</b>
          <p className='text-gray-600 mt-2'>
            Our vision at Caring Nanny is to revolutionize childcare by creating a seamless experience for families and nannies alike. We aim to bridge the gap between families and professional caregivers, making it easier to find trusted childcare when needed.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4'>
        <p className='text-3xl font-bold text-center text-indigo-700'>WHY CHOOSE US</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 mx-4'>
        <div className='border rounded-lg shadow-lg p-6 flex flex-col gap-3 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <FaHandsHelping className='text-indigo-600 text-3xl' />
          <b className='text-lg text-indigo-600'>Quality Care:</b>
          <p className='text-gray-600'>We thoroughly vet and select each nanny to ensure they meet our high standards of care and professionalism.</p>
        </div>
        <div className='border rounded-lg shadow-lg p-6 flex flex-col gap-3 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <FaCalendarAlt className='text-indigo-600 text-3xl' />
          <b className='text-lg text-indigo-600'>Flexibility:</b>
          <p className='text-gray-600'>Our services are designed to accommodate your family's specific needs, from part-time to full-time care.</p>
        </div>
        <div className='border rounded-lg shadow-lg p-6 flex flex-col gap-3 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl'>
          <FaHeadset className='text-indigo-600 text-3xl' />
          <b className='text-lg text-indigo-600'>Exceptional Support:</b>
          <p className='text-gray-600'>Our dedicated team is here to assist you every step of the way, ensuring your satisfaction and peace of mind.</p>
        </div>
      </div>
    </div>
  );
};

export default About;