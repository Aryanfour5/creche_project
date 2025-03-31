import React from 'react';

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-4 sm:px-[4%] justify-between'>
      <h1 className='text-lg sm:text-xl font-bold'>Admin Panel</h1> {/* Placeholder for logo */}
      <button 
        onClick={() => setToken('')} 
        className='bg-gray-600 text-white px-4 py-1 sm:px-7 sm:py-2 rounded-full text-sm sm:text-base'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;