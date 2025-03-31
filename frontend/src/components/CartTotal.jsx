import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartTotal.css'; // Importing the CSS file for styling

const CartTotal = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/getcart');
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.rate * item.hours, 0);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          <ul>
            {cartItems.map(item => (
              <li key={item.nannyId} className="cart-item">
                <div className="item-info">
                  <h2>{item.firstName} {item.lastName}</h2>
                  <p>Rate: ${item.rate} x {item.hours} hours</p>
                </div>
                <span className="item-total">Total: ${(item.rate * item.hours).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Total Amount: ${calculateTotal().toFixed(2)}</h2>
          </div>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartTotal;