const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // ID of the user who made the request
  proffesionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // ID of the professional who will provide the service
  type: {
    type: String,
    enum: ["membership", "pay-on-demand"],
  }, // Membership or pay-on-demand
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("ServiceRequest", ServiceSchema);
