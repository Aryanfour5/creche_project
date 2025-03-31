import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { username, email, phoneNumber, aadharCard } = response.data;
      // Populate the state with the fetched data
      setUsername(username);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setAadharCard(aadharCard);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profile data.');
    }
  };

  // Handle profile update
// Handle profile update
const handleUpdateProfile = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  setLoading(true); // Set loading state to true

  try {
    const token = localStorage.getItem('token');
    console.log(token);
    await axios.put(
      'http://localhost:5000/api/user/profile',
      {
        username,
        email,
        phoneNumber,
        aadharCard,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
console.log('profile updates');
    alert('Profile updated successfully!'); // Notify success

    // Refresh profile data to update the fields with the new values
    fetchProfileData();
  } catch (error) {
    console.error(error);
    toast.error('Failed to update profile.'); // Notify failure
  } finally {
    setLoading(false); // Reset loading state
  }
};


  // Fetch profile data when the component mounts
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-white'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>My Profile</h1>

        <form onSubmit={handleUpdateProfile}>
          {/* Username Field */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              required
            />
          </div>

          {/* Email Field */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              required
            />
          </div>

          {/* Aadhar Card Field */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Aadhar Card</label>
            <input
              type="text"
              value={aadharCard}
              onChange={(e) => setAadharCard(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              required
            />
          </div>

          {/* Update Button */}
          <button 
            type="submit" 
            className={`mt-2 w-full py-2 px-4 rounded-md text-white bg-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
