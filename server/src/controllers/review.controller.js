import Review from "../models/review.modal.js";

// @desc    Get all reviews for a specific product
// @route   GET /api/v1/reviews/:productId
// @access  Public
const getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching reviews.' });
  }
};

export {
  getReviewsByProductId
}