import mongoose from "mongoose";

// Define the connectDB function to connect to MongoDB
const connectDB = async () => {
  // Listen for the 'connected' event on the mongoose connection
  mongoose.connection.on('connected', () => {
    console.log("✅ DB Connected");
  });

  // Connect to the MongoDB URI using environment variables
  try {
    await mongoose.connect("mongodb+srv://bachutearyan:aryanbachute@creche.m2a5j.mongodb.net/?retryWrites=true&w=majority&appName=Creche");
    console.log("✅ Connection to MongoDB established");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure if the connection fails
  }
};

export default connectDB;
