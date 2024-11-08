import Nanny from '../models/nannyModel.js'; // Adjust the path to your Nanny model
import cloudinary from 'cloudinary'; // Import the entire Cloudinary module
const { v2: cloudinaryV2 } = cloudinary; // Destructure to get the v2 object
const getRandomRating = () => {
    return (Math.random() * (5 - 1) + 1).toFixed(1); // Generates a number between 1 and 5 with one decimal
  };
  
// Configure Cloudinary
cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Set your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Set your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Set your Cloudinary API secret
});
// Function to add a new nanny
export const addNanny = async (req, res) => {
    const {
        firstName,
        lastName,
        age,
        experience,
        certifications,
        contactEmail,
        contactPhone,
        address,
        rate
    } = req.body;

    try {
        // Validate required fields
        if (!firstName || !lastName || !age || !experience || !contactEmail || !contactPhone) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Email and phone number format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!emailRegex.test(contactEmail)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (!phoneRegex.test(contactPhone)) {
            return res.status(400).json({ message: 'Invalid phone number format.' });
        }

        // Check for existing nanny
        const existingNanny = await Nanny.findOne({
            $or: [{ contactEmail }, { contactPhone }],
        });

        if (existingNanny) {
            return res.status(409).json({ message: 'Nanny with this email or phone number already exists.' });
        }

        // Process certifications if provided
        let certificationsArray = [];
        if (certifications) {
            if (Array.isArray(certifications)) {
                certificationsArray = certifications;
            } else if (typeof certifications === 'string') {
                certificationsArray = certifications.split(',').map(cert => cert.trim());
            } else {
                return res.status(400).json({ message: 'Invalid format for certifications.' });
            }
        }

        // Upload the profile picture to Cloudinary
        let profilePictureUrl = null;
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'nannies', // Optional: Specify a folder in Cloudinary
            });
            profilePictureUrl = result.secure_url; // Get the secure URL of the uploaded image
        }

        // Create new nanny object
        const newNanny = new Nanny({
            firstName,
            lastName,
            age,
            experience,
            certifications: certificationsArray,
            profilePicture: profilePictureUrl, // Save the Cloudinary URL
            contactEmail,
            contactPhone,
            address,
            rate,
            ratings:getRandomRating(),
        });

        // Save the new nanny to the database
        const savedNanny = await newNanny.save();

        res.status(201).json({
            message: 'Nanny profile created successfully!',
            nanny: savedNanny,
        });
    } catch (error) {
        console.error('Error creating nanny profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to list all nannies
export const listNannies = async (req, res) => {
    try {
        const nannies = await Nanny.find();
        // Convert profilePicture path to a full URL
        const nanniesWithImages = nannies.map(nanny => {
            return {
                ...nanny.toObject(),
                profilePicture: nanny.profilePicture, // This will already be the Cloudinary URL
            };
        });

        res.status(200).json({ success: true, nannies: nanniesWithImages });
    } catch (error) {
        console.error('Error fetching nannies:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getNanniesWithRatings = async (req, res) => {
  try {
    const nannies = await Nanny.aggregate([
      {
        $lookup: {
          from: 'feedbacks', // Name of the feedback collection in MongoDB
          localField: '_id',
          foreignField: 'nannyId',
          as: 'feedbacks',
        },
      },
      {
        $addFields: {
          averageRating: { 
            $avg: '$feedbacks.rating' 
          }, // Calculate the average rating
          feedbackCount: { 
            $size: '$feedbacks' 
          }  // Count of feedbacks
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          age: 1,
          experience: 1,
          certifications: 1,
          profilePicture: 1,
          contactEmail: 1,
          contactPhone: 1,
          address: 1,
          averageRating: { $ifNull: ['$averageRating', 0] }, // Default to 0 if no ratings
          feedbackCount: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, nannies });
  } catch (error) {
    console.error('Error fetching nannies with ratings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Function to get a single nanny by ID
export const getNannyById = async (req, res) => {
    const { id } = req.params;

    try {
        const nanny = await Nanny.findById(id);

        if (!nanny) {
            return res.status(404).json({ message: 'Nanny not found.' });
        }

        res.status(200).json(nanny);
    } catch (error) {
        console.error('Error fetching nanny:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to remove a nanny by ID
export const removeNanny = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNanny = await Nanny.findByIdAndDelete(id);

        if (!deletedNanny) {
            return res.status(404).json({ message: 'Nanny not found.' });
        }

        res.status(200).json({ message: 'Nanny removed successfully.' });
    } catch (error) {
        console.error('Error removing nanny:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
