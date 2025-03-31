import axios from 'axios'; // Ensure axios is installed: npm install axios
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Ensure toastify is installed: npm install react-toastify

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      // Assuming the backend returns a token
      localStorage.setItem('token', response.data.token); // Store token in local storage

      // Redirect to home or another page
      navigate('/'); // Use useNavigate to redirect
    } catch (err) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-white'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Login</h1>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='text-sm font-medium text-gray-700 mb-2'>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              placeholder='your@email.com'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='text-sm font-medium text-gray-700 mb-2'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              placeholder='Enter your password'
              required
            />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">
            Login
          </button>
        </form>

        {/* Links for forgot password and sign up */}
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-yellow-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/signup" className="text-yellow-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;