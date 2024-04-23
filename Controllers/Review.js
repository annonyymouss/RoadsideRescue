const Review = require("../models/reviewmodel");

const CreateReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating review",
      error: error.message,
    });
  }
};

const GetReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching reviews",
      error: error.message,
    });
  }
};

const GetReviewByProffesional = async (req, res) => {
  try {
    const reviews = await Review.find({
      proffesionalId: req.params.userId,
    });
    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching reviews",
      error: error.message,
    });
  }
};

module.exports = { CreateReview, GetReviews, GetReviewByProffesional };
