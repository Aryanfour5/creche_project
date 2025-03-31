import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const { id } = useParams(); // Get the babysitter ID from the URL
  const [babysitter, setBabysitter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBabysitter = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/babysitter/${id}`); // Adjust API endpoint
        setBabysitter(response.data.babysitter); // Adjust for the babysitter data structure
      } catch (error) {
        console.error('Error fetching babysitter:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBabysitter();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      // Assume the babysitter object is already fetched
      await axios.post('http://localhost:5000/api/cart', {
        babysitterId: babysitter._id,
        firstName: babysitter.firstName,
        lastName: babysitter.lastName,
        contactEmail: babysitter.contactEmail,
        rate: babysitter.rate || 500,
      });

      alert(`${babysitter.firstName} ${babysitter.lastName} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding babysitter to cart:', error);
      alert('Failed to add babysitter to cart.');
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  if (!babysitter) {
    return <div className="text-center text-xl text-gray-500">Babysitter not found.</div>;
  }

  return (
    <div className="p-5 font-sans">
      <h1 className="mb-5 text-2xl text-center font-bold">{`${babysitter.firstName} ${babysitter.lastName}`}</h1>
      <img
        className="w-full h-60 object-cover rounded-lg mb-4"
        src={babysitter.profilePicture || 'default-image-url.jpg'}
        alt={`${babysitter.firstName} ${babysitter.lastName}`}
      />
      <div className="p-4 bg-white shadow-md rounded-lg">
        <p className="text-gray-600">{babysitter.experience || 'No experience description available.'}</p>
        <p className="text-gray-600">Contact: {babysitter.contactEmail}</p>
        <p className="text-gray-600">Rate: ${babysitter.rate} / hour</p>
        <button
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="mt-2 w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Product;
