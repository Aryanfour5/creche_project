import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    status: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Order = mongoose.model('Order', OrderSchema);
export default Order;  