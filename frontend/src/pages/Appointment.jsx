import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const  Appointment = () => {
  const [purchasedNannies, setPurchasedNannies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedNannies = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view purchased nannies.');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const response = await axios.get('http://localhost:5000/api/purchased-nannies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setPurchasedNannies(response.data.nannies || []);
        } else {
          console.error('Error fetching purchased nannies:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching purchased nannies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedNannies();
  }, []);

  const handleScheduleAppointment = (nanny) => {
    alert(`Scheduling appointment with ${nanny.firstName} ${nanny.lastName}`);
    // Implement scheduling logic here
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-5 font-sans">
      <h1 className="mb-5 text-2xl text-center font-bold">Purchased Nannies</h1>
      {purchasedNannies.length === 0 ? (
        <div className="text-center text-gray-500">No purchased nannies available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedNannies.map((nanny) => (
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
                className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600"
                onClick={() => handleScheduleAppointment(nanny)}
              >
                Schedule Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointment;