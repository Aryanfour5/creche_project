import React, { useState, useRef, useEffect } from 'react';
import profileIcon from '../assets/frontend_assets/profile_icon.png';
import cartIcon from '../assets/frontend_assets/cart_icon.png';
import menuIcon from '../assets/frontend_assets/menu_icon.png';
import dropdownIcon from '../assets/frontend_assets/dropdown_icon.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);  // Ref for the dropdown
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
  };

  const closeMenu = () => {
    setVisible(false);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Logo and Caring Nanny Title */}
      <div className="flex items-center gap-2">
        <img src='/logo2.webp' alt="Caring Nanny Logo" className="w-12 h-auto" />
        <Link to='/' className='font-bold text-xl text-blue-600'>
          Caring Nanny
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-blue-500' : ''}`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to='/babysitter'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-blue-500' : ''}`
          }
        >
          BABYSITTER
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-blue-500' : ''}`
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-blue-500' : ''}`
          }
        >
          CONTACT
        </NavLink>
        <NavLink
          to='/purchased'
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-blue-500' : ''}`
          }
        >
          PURCHASES
        </NavLink>
        
      </ul>

      {/* Profile, Cart, and Chatbot Icons */}
      <div className='flex items-center gap-6'>
        <div className='relative'>
          <img
            onClick={handleDropdownToggle}
            className='w-5 cursor-pointer'
            src={profileIcon}
            alt="Profile"
          />
          {dropdownVisible && (
            <div
              ref={dropdownRef} // Attach the ref to the dropdown
              className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10'
            >
              <Link to='/signup' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Sign Up</Link>
              <Link to='/login' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Login</Link>
              <Link to='/profile' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>My Profile</Link>
              <div onClick={logout} className='block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer'>Sign Out</div>
              <a href='http://localhost:5174' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Sign In as Admin</a>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative'>
          <img src={cartIcon} className='w-5 min-w-5' alt="Cart" />
        </Link>

        <img onClick={() => setVisible(true)} src={menuIcon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      {/* Mobile Menu */}
      {visible && (
        <div className='fixed inset-0 z-50 flex'>
          {/* Overlay */}
          <div className='absolute inset-0 bg-black opacity-50' onClick={closeMenu}></div>
          
          {/* Side Menu */}
          <div className='relative bg-white w-2/3 max-w-xs h-full transition-all flex flex-col text-gray-600'>
            <div onClick={closeMenu} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img className='h-4 rotate-180' src={dropdownIcon} alt="Back" />
              <p>Back</p>
            </div>
            <NavLink onClick={closeMenu} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={closeMenu} className='py-2 pl-6 border' to='/babysitter'>BABYSITTER</NavLink>
            <NavLink onClick={closeMenu} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink onClick={closeMenu} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;