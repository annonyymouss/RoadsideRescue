const {
  CreateReview,
  GetReviews,
  GetReviewByProffesional,
} = require("../Controllers/Review");

const express = require("express");

const router = express.Router();

router.post("/create", CreateReview);
router.get("/", GetReviews);
router.get("/professional/:userId", GetReviewByProffesional);

module.exports = router;
