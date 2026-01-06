const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    externalId: String,
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    amount: Number,
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
    },
    method: String,
    transactionId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
