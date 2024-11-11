import React from 'react';
import exchangeIcon from '../assets/frontend_assets/exchange_icon.png'; // Import your images directly
import qualityIcon from '../assets/frontend_assets/quality_icon.png';
import supportImg from '../assets/frontend_assets/support_img.png';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div className='bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105'>
        <img src={exchangeIcon} className='w-12 m-auto mb-5' alt="Easy Exchange Policy" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer a hassle-free exchange policy</p>
      </div>
      
      <div className='bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105'>
        <img src={qualityIcon} className='w-12 m-auto mb-5' alt="7 Days Return Policy" />
        <p className='font-semibold'>7 Days use  Policy</p>
        <p className='text-gray-400'>We provide a 7 days free use policy</p>
      </div>
      
      <div className='bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105'>
        <img src={supportImg} className='w-12 m-auto mb-5' alt="Best Customer Support" />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>

    </div>
  );
};

export default OurPolicy;
