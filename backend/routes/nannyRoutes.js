import express from 'express';
import upload from '../middlewares/multer.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Appointment from '../models/Appointment.js';
import Nanny from '../models/nannyModel.js';// Adjust the path based on your project structure
import authenticate from '../middlewares/auth.js';
import PurchasedNannies from '../models/PurchasedNannies.js';
import { getNanniesWithRatings } from '../controllers/nannyController.js';
import {
    addNanny,
    listNannies,
    getNannyById,
    removeNanny
} from '../controllers/nannyController.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nannyRouter = express.Router();
nannyRouter.use('/public', express.static(path.join(__dirname, 'public')));

// Define routes
nannyRouter.post('/add', upload.single('profilePicture'), addNanny);
nannyRouter.post('/list', listNannies);
nannyRouter.get('/na/:id', getNannyById);
nannyRouter.delete('/remove/:id', removeNanny);
nannyRouter.get('/user/purchased-nannies', authenticate, async (req, res) => {
  try {
      const userId = req.user.userId;
      console.log("User ID:", userId);

      // Fetch purchased nannies for the logged-in user and populate the nanny's name
      const purchasedNannies = await PurchasedNannies.find({ userId })
          .populate({
              path: 'nannyId',
              select: 'firstName lastName', // Only fetch the fields needed
              options: { strictPopulate: false } // Ensure population even if nannyId is missing
          })
          .exec();

      // Log the data after population
      console.log("Purchased Nannies after population:", purchasedNannies);

      // Map the results to include all purchased records with a default message for missing nannyId
      const response = purchasedNannies.map((purchasedNanny) => {
          const nanny = purchasedNanny.nannyId;
          return {
              nannyName: nanny ? `${nanny.firstName} ${nanny.lastName}` : 'Nanny not found',
              purchaseDate: purchasedNanny.purchaseDate,
              nannyId: nanny ? nanny._id : null,
          };
      });

      res.status(200).json({ success: true, nannies: response });
  } catch (error) {
      console.error('Error retrieving purchased nannies:', error);
      res.status(500).json({
          success: false,
          message: 'Error retrieving purchased nannies.',
          error: error.message,
      });
  }
});

nannyRouter.post('/book-appointment', authenticate, async (req, res) => {
    const { nannyId } = req.body; // Extract nannyId from request body
    const userId = req.user.userId; // Assuming the user ID is available in the request after token verification
    const userLocation = req.body.location || "Default Location"; // Get user location from request, if necessary
    const meetingTime = new Date(); // Set your desired meeting time (you can pass this from the request if needed)

    try {
        // Find the nanny in the database
        const nanny = await Nanny.findById(nannyId);
        if (!nanny) {
            return res.status(404).json({ message: 'Nanny not found' });
        }

        // Create a new appointment
        const appointment = new Appointment({
            nannyId,
            userId,
            location: userLocation,
            meetingTime: meetingTime,
        });

        // Save the appointment to the database
        await appointment.save();

        // Respond with the nanny details
        res.status(200).json({
            message: 'Appointment booked successfully',
            nannyName: nanny.name, // Adjust the property based on your Nanny model
            nannyPhone: nanny.phone, // Assuming you have a phone field in your Nanny model
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to save purchased nanny
// Endpoint to save purchased nannies
nannyRouter.post('/purchasednanny',authenticate, async (req, res) => {
    try {
      const { nannyIds } = req.body;
  const userId=req.user.userId;
      // Validate that nannyIds is an array
      if (!Array.isArray(nannyIds) || nannyIds.length === 0) {
        return res.status(400).json({ error: "nannyIds should be a non-empty array" });
      }
  
      // Map each nannyId to a new PurchasedNanny document
      const purchasedNannies = nannyIds.map((nannyId) => ({
        nannyId,
        userId,
        purchaseDate: new Date(),
      }));
  
      // Save all PurchasedNanny documents in one operation
      const savedPurchasedNannies = await PurchasedNannies.insertMany(purchasedNannies);
  
      // Respond with the IDs of saved PurchasedNanny records
      const purchasedNannyIds = savedPurchasedNannies.map((nanny) => nanny._id);
      res.status(201).json({ purchasedNannyIds });
    } catch (error) {
      console.error("Error saving purchased nannies:", error);
      res.status(500).json({ error: 'Failed to save purchased nannies' });
    }
  });
  
  
  nannyRouter.post('/list-with-ratings', getNanniesWithRatings);
  
  
  

export default nannyRouter;
