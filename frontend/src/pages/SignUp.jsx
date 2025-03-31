import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for notifications

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/user/signup', {
        username,
        email,
        password,
        aadharCard,
        phoneNumber,
      });
      setLoading(false);
      toast.success('Account created successfully!'); // Success message
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      setLoading(false);
      console.error(err); // Log the error for debugging
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
      toast.error(error); // Show error message
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-white pt-10'> {/* Added padding-top to avoid touching navbar */}
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        
        <form onSubmit={handleSignUp}>
          <div className='mb-3'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              placeholder='Enter your username'
              required
            />
          </div>
          
          <div className='mb-3'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              placeholder='your@email.com'
              required
            />
          </div>
          
          <div className='mb-3'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              placeholder='Enter your password'
              required
            />
          </div>
          
          <div className='mb-3'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Aadhar Card</label>
            <input
              type="text"
              value={aadharCard}
              onChange={(e) => setAadharCard(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              placeholder='Enter your Aadhar Card number'
              required
            />
          </div>
          
          <div className='mb-3'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              placeholder='Enter your phone number'
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={`mt-2 w-full py-2 px-4 rounded-md text-white bg-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;



