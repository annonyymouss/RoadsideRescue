const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // ID of the user making the payment
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // ID of the professional receiving the payment
  amount: Number,
  orderId: String,
  // Other payment properties
});

module.exports = mongoose.model("Payment", PaymentSchema);
