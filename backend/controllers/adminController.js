// controllers/adminController.js



// Get all purchases with user and nanny details
export const getPurchasesWithUserAndNanny = async (req, res) => {
  try {
    const PurchasedNannies = await PurchaseN.aggregate([
      {
        $lookup: {
          from: 'users',              // Collection to join with
          localField: 'userId',       // Field from the Purchase collection
          foreignField: '_id',        // Field from the User collection
          as: 'userDetails'
        }
      },
      {
        $lookup: {
          from: 'nannies',            // Collection to join with
          localField: 'nannyId',      // Field from the Purchase collection
          foreignField: '_id',        // Field from the Nanny collection
          as: 'nannyDetails'
        }
      },
      { $unwind: "$userDetails" },  // Flatten userDetails array
      { $unwind: "$nannyDetails" }, // Flatten nannyDetails array
      {
        $project: {
          'userDetails.name': 1,
          'nannyDetails.name': 1,
          'purchaseDate': 1
        }
      }
    ]);

    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default getPurchasesWithUserAndNanny;