const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  id: Number,
  serviceRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
  }, // ID of the service request associated with the review
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // ID of the user who submitted the review
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // ID of the professional who received the review
  rating: Number,
  comment: String,
  // Other review properties
});

module.exports = mongoose.model("Review", ReviewSchema);
