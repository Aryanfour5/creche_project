import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const backendUrl = 'http://localhost:5000';

const Orders = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${backendUrl}/appointments`);
        console.log(response.data);
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="orders-container">
      <h1>Appointment List</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Nanny</th>
            <th>Location</th>
            <th>Meeting Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase._id}>
              <td>{purchase.userId?.username}</td>
              <td>{purchase.nannyId?.firstName}</td>
              <td>{purchase.location}</td>
              <td>{new Date(purchase.meetingTime).toLocaleString()}</td>
              <td>{purchase.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
