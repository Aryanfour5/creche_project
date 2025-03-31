import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasedNannyIds, setPurchasedNannyIds] = useState([]); // Store purchased nanny IDsss

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.cartItems) {
          console.log(response.data.cartItems);
          setCartItems(response.data.cartItems);
        } else {
          console.error('No cart items found');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);
  
  const deleteCartItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
        alert("Item deleted successfully!");
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      alert(`Failed to delete item. Please try again. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  
  const totalRate = () => {
    return cartItems.reduce((total, item) => total + item.rate, 0);
  };

  const handlePayment = async () => {
    const amount = totalRate() * 100; // Convert to paise for Razorpay
    const currency = "INR";
    const receiptId = "receipt_1";
  
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Token not found. Please log in to continue.");
            return;
        }
  
        // Gather all nannyId values from cart items
        const nannyIds = cartItems.map((item) => item.nannyId);
        console.log(nannyIds);

        // Save all cart items in the PurchasedNanny collection in one request
        const saveNanniesResponse = await axios.post(
            "http://localhost:5000/api/nanny/purchasednanny",
            { nannyIds },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (saveNanniesResponse.status === 201) {
            console.log("Purchased Nanny IDs stored:", saveNanniesResponse.data.purchasedNannyIds);
        } else {
            throw new Error("Failed to save purchased nannies");
        }
  
        // Create order in the backend
        const orderResponse = await axios.post(
            "http://localhost:5000/order",
            { amount, currency, receipt: receiptId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (orderResponse.status !== 200) {
            throw new Error("Failed to create order with Razorpay.");
        }
  
        const order = orderResponse.data;

        const options = {
            key: "rzp_test_Y7J8yPZseC3NNh",
            amount,
            currency,
            name: "Creche Project",
            description: "Pay for your order",
            order_id: order.id,
            handler: async (response) => {
                const paymentDetails = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    amount,
                    currency,
                    receipt: receiptId,
                };

                // Validate payment
                const validateRes = await axios.post(
                    "http://localhost:5000/order/validate",
                    paymentDetails,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log("Payment Success:", validateRes.data);
                alert("Thank you for your payment!");
                
                // Clear cart and purchased nanny IDs after payment
                setCartItems([]); // Clear cart on successful payment
                setPurchasedNannyIds([]); // Clear purchased nanny IDs after payment
            },
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
            console.error("Payment Failed:", response.error);
            alert("Payment failed. Please try again.");
        });
        rzp.open();
    } catch (error) {
        console.error("Error creating order or saving purchased nannies:", error);
        alert("An error occurred while processing your payment. Please try again.");
    }
};


  if (loading) {
    return <div className="p-5 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">Loading cart items...</div>;
  }

  return (
    <div className="p-5 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-12">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col border-b border-gray-300 py-2">
              <span>
                <strong>Name:</strong> {item.firstName} {item.lastName}
              </span>
              <span>
                <strong>Email:</strong> {item.contactEmail}
              </span>
              <span>
                <strong>Rate:</strong> ${item.rate.toFixed(2)}
              </span>
              <button
                onClick={() => deleteCartItem(item._id)}
                className="bg-black text-white border-none py-1 px-2 rounded mt-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="text-lg font-bold mt-5 text-right text-green-800">
            Total Rate: ${totalRate().toFixed(2)}
          </div>
          <button
            onClick={handlePayment}
            className="inline-block bg-black text-white py-2 px-4 text-lg rounded mt-5 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-800"
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
