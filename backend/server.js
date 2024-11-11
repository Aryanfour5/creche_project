import express from 'express';
import cors from 'cors';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import nannyRouter from './routes/nannyRoutes.js';
import cartRouter from './routes/cartRoutes.js'; 
import authenticate from './middlewares/auth.js';
import path from 'path';
import Appointment from './models/Appointment.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import Nanny from './models/nannyModel.js';
import User from './models/userModel.js';
import nodemailer from 'nodemailer';
//import PurchasedNanny from '../frontend/src/pages/PurchasedNannies.jsx';// Import cart routes
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
; // Cloudinary config
import imageRouter from './routes/imageRoutes.js'; // Your new image routes
import Feedback from './models/Feedback.js';
//import purchasedNanniesRoute from "./routes/PurchasedNanniesRoutes.js";
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
connectCloudinary();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: ['*',
    'https://creche-project-alpha.vercel.app/',
    'http://localhost:3000', // Existing frontend
    'http://localhost:5174'  // New frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If you need to send cookies with the request
}));

app.use(express.json());
app.use((req, res, next) => {
  req.setTimeout(500000); // Set timeout to 500,000 ms (500 seconds or 8.3 minutes)
  res.setTimeout(500000); // Set timeout for response
  next();
});

app.get('/', (req, res) => {
  res.send("API working");
});
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.status(204).end(); // No Content status to end request without response
  } else {
    next();
  }
});
app.use(express.json());
app.use('/backend/admin/public', express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      // Save files to the 'public/uploads' directory
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      // Set the filename as the original name
      cb(null, file.originalname);
  },
});


app.get('/test',async(req,res)=>{
res.send("working");
});



// Initialize upload
const upload = multer({ storage });
app.use('/api/images', imageRouter);
// Use user, nanny, and cart routes
app.use('/api/user', userRouter);
app.use('/api/nanny', nannyRouter);
app.use('/api/cart', cartRouter); // Use cart routes
app.get('/api/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'public', 'uploads', filename);
  
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    }
  });
});
// Get purchased nannies for the logged-in user
app.get('/purchases', async (req, res) => {
  try {
    const Appointment = await Appointment.find()
      .populate('nannyId', 'name') // Only fetch 'name' from Nanny
      .populate('userId', 'name'); // Only fetch 'name' from User

    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Error fetching purchases' });
  }
});
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('nannyId', 'firstName')
      .populate('userId', 'username');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});
app.post('/submit', async (req, res) => {
  try {
    const { nannyId, userId, rating, comment } = req.body;
    
    const newFeedback = new Feedback({
      nannyId,
      userId,
      rating,
      comment
    });
    const feedbacks = await Feedback.find({ nannyId });
    const avgRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length;
    
    await Nanny.findByIdAndUpdate(nannyId, { averageRating: avgRating });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET route to get feedback for a nanny
app.get('/:nannyId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ nannyId: req.params.nannyId });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

//app.use("/api/purchased-nannies", purchasedNanniesRoute);
// Create order endpoint
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating order");
  }
});

// Validate payment endpoint
app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Validate the payment signature
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  // Save order data to the database
  try {
    const newOrder = new Order({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: "Success",
    });

    await newOrder.save();

    res.json({
      msg: "Payment successful and order saved to database",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error saving order to database" });
  }
});
app.post('/feedback', authenticate, async (req, res) => {
  try {
    const { nannyId, feedback, rating } = req.body;
    const userId = req.user.userId; // Assuming user ID is extracted from the token via middleware

    // Validate input
    if (!nannyId || !feedback || !rating) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    // Create the feedback document
    const newFeedback = new Feedback({
      nannyId,
      userId,
      feedback, // This is where 'feedback' is used instead of 'comment'
      rating,
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Calculate the new average rating for the nanny
    const feedbacks = await Feedback.find({ nannyId });
    const avgRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length;

    // Update the nanny's average rating
    await Nanny.findByIdAndUpdate(nannyId, { averageRating: avgRating });

    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully!',
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting feedback.',
    });
  }
});
app.get('/ratings', async (req, res) => {
  try {
    console.log('Request to /ratings received');

    // Aggregation to lookup feedbacks and calculate ratings
    const nanniesWithRatings = await Nanny.aggregate([
      {
        $lookup: {
          from: 'feedbacks', // Collection name for feedbacks
          localField: '_id', // Field in nanny collection
          foreignField: 'nannyId', // Field in feedback collection
          as: 'feedbacks', // Alias for feedback array
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          averageRating: { 
            $ifNull: [{ $avg: '$feedbacks.rating' }, 0] // Handle null ratings
          },
          feedbackCount: { 
            $size: '$feedbacks' // Count the number of feedbacks
          },
        },
      },
    ]);

    // Log the fetched ratings to check the structure
    console.log('Fetched ratings:', nanniesWithRatings);

    // Send response with the fetched ratings
    res.status(200).json({ success: true, ratings: nanniesWithRatings });
  } catch (error) {
    console.error('Error fetching nanny ratings:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching nanny ratings.' });
  }
});
app.get('/nanny/:id/average-rating', async (req, res) => {
  try {
    const { id } = req.params;
    const nanny = await Nanny.findById(id);

    if (!nanny) {
      return res.status(404).json({ message: 'Nanny not found' });
    }

    // Use the virtual `averageRating` field
    res.json({ averageRating: nanny.averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
function getRandomRating(min = 3, max = 4.9) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




