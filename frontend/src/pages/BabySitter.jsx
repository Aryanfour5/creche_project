import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
 // Import jwtDecode correctly

const BabySitter = () => {
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/nanny/list');
        if (response.data.success) {
          setNannies(response.data.nannies || []);
        } else {
          console.error('Error fetching nannies:', response.data.message);
          alert(`Error: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error fetching nannies:', error);
        alert('An error occurred while fetching nannies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    fetchNannies();
  }, []);

  const handleAddToCart = async (nanny) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add a nanny to your cart.');
      return;
    }

    try {
      // Decode the token to get the userId
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // Add the nanny to the cart
      await axios.post('http://localhost:5000/api/cart', {
        nannyId: nanny._id,
        firstName: nanny.firstName,
        lastName: nanny.lastName,
        contactEmail: nanny.contactEmail,
        rate: nanny.rate || 500,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newCart = [...cart, nanny];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      alert(`${nanny.firstName} ${nanny.lastName} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding nanny to cart:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert('Network Error: Unable to reach the server.');
      } else {
        alert(`An unexpected error occurred.`);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-5 font-sans">
      <h1 className="mb-5 text-2xl text-center font-bold">Available Nannies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nannies.length === 0 ? (
          <div className="text-center text-gray-500">No nannies available at the moment.</div>
        ) : (
          nannies.map((nanny) => (
            <div
              key={nanny._id}
              className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105"
            >
              <img
                className="w-full h-40 object-cover"
                src={nanny.profilePicture || 'https://via.placeholder.com/150'}
                alt={`${nanny.firstName} ${nanny.lastName}`}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{`${nanny.firstName} ${nanny.lastName}`}</h2>
                <p className="text-gray-600">{nanny.experience || 'No experience description available.'}</p>
                <p className="text-gray-600">Contact: {nanny.contactEmail}</p>
                <p className="text-gray-600">Rate: ${nanny.rate} / hour</p>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-green-600"
                onClick={() => handleAddToCart(nanny)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BabySitter;
