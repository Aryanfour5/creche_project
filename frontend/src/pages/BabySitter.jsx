import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BabySitter = () => {
  const [rating, setRating] = useState(0);
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [selectedNanny, setSelectedNanny] = useState(null); // Store the selected nanny for detailed view
  const [viewingDetails, setViewingDetails] = useState(false); // Flag to show nanny details modal
  const topRef = useRef(null); // Ref to scroll to the top

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
      const decoded = jwtDecode(token);
      const userId = decoded.id;

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
      alert('An error occurred while adding the nanny to the cart.');
    }
  };

  const handleSubmitFeedback = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to submit feedback.');
      return;
    }

    if (!selectedNanny || !feedback || !rating) {
      alert('Please select a nanny, provide feedback, and rate the nanny.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const response = await axios.post(
        'http://localhost:5000/feedback',
        { nannyId: selectedNanny._id, userId, feedback, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Feedback submitted successfully!');
        setFeedback(""); // Clear feedback input
        setRating(0); // Clear rating input
        setSelectedNanny(null); // Reset selected nanny after submission
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback.');
    }
  };

  const handleLeaveFeedback = (nanny) => {
    if (selectedNanny && selectedNanny._id === nanny._id) {
      setSelectedNanny(null); // Close the feedback form if the same nanny is clicked
    } else {
      setSelectedNanny(nanny); // Open the feedback form for the selected nanny
    }

    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the top when leaving feedback
    }

    // Ensure viewingDetails is set to false when leaving feedback since it's a different mode
    setViewingDetails(false);
  };

  const handleViewDetails = (nanny) => {
    setSelectedNanny(nanny);
    setViewingDetails(true); // Show details view
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseDetails = () => {
    setViewingDetails(false); // Close the details view
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  // Add this within the "viewingDetails && selectedNanny" condition
if (viewingDetails && selectedNanny) {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{`${selectedNanny.firstName} ${selectedNanny.lastName}`}</h1>
      <div className="flex flex-col sm:flex-row">
        <img
          className="w-full h-64 object-contain rounded-lg shadow-md"
          src={selectedNanny.profilePicture || 'https://via.placeholder.com/150'}
          alt={`${selectedNanny.firstName} ${selectedNanny.lastName}`}
        />
        <div className="sm:ml-5 mt-5 sm:mt-0">
          <p><strong>Experience:</strong> {selectedNanny.experience || 'No experience available.'}</p>
          <p><strong>Email:</strong> {selectedNanny.contactEmail}</p>
          <p><strong>Phone:</strong> {selectedNanny.contactPhone || 'No phone available.'}</p>
          <p><strong>Address:</strong> {selectedNanny.address || 'No address available.'}</p>
          <p><strong>Rate:</strong> ${selectedNanny.rate} / hour</p>
          <div className="flex items-center mt-4">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-xl ${index < (selectedNanny.averageRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="ml-2">({(selectedNanny.averageRating || 0).toFixed(1)})</span>
          </div>
        </div>
      </div>

      {/* Leave Feedback Section */}
      <div className="mt-5">
        <div className="flex justify-center items-center">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-xl cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => setRating(index + 1)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
          placeholder="Leave your feedback here"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          onClick={handleSubmitFeedback}
          className="w-full mt-2 bg-green-600 text-white py-2 rounded-md"
          disabled={!feedback || !rating}
        >
          Submit Feedback
        </button>
      </div>

      <div className="flex mt-5">
        <button
          onClick={handleAddToCart.bind(null, selectedNanny)}
          className="flex-1 mr-2 bg-blue-500 text-white py-2 rounded-md"
        >
          Add to Cart
        </button>
        
        <button
          onClick={handleCloseDetails}
          className="flex-1 bg-red-500 text-white py-2 rounded-md"
        >
          Close Details
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="p-5 font-sans">
      <div ref={topRef} /> {/* Reference to scroll to */}
      <h1 className="mb-5 text-2xl text-center font-bold">Available Nannies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nannies.length === 0 ? (
          <div className="text-center text-gray-500">No nannies available at the moment.</div>
        ) : (
          nannies.map((nanny) => (
            <div
              key={nanny._id}
              className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105"
              onClick={() => handleViewDetails(nanny)} // Add onClick to open details on card click
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
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${index < (nanny.averageRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2">({(nanny.averageRating || 0).toFixed(1)})</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BabySitter;
