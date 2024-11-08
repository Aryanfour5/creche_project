import mongoose from 'mongoose';

const nannySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  contactEmail: String,
  contactPhone: String,
  address: String,
  rate: Number,  // Hourly rate for nanny
  profilePicture: String,
  experience: String,
  ratings: { type: [Number], default: [] },  // Default to an empty array for ratings
}, { timestamps: true });

// Virtual field to calculate the average rating
nannySchema.virtual('averageRating').get(function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, rating) => sum + rating, 0);
  return total / this.ratings.length;
});

const Nanny = mongoose.model('Nanny', nannySchema);

export default Nanny;