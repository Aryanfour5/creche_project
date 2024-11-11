const PurchasedNannySchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    nannyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nanny", // Reference to the Nanny model
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  });
  // API endpoints
  export default mongoose.model("PurchasedNanny", PurchasedNannySchema);