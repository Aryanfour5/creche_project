import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  nannyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nanny', // assuming you have a Nanny model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
