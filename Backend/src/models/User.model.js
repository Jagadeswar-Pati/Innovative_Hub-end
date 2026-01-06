const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    externalId: { type: String, unique: true },
    name: String,
    email: String,
    mobile: String,
    profileImage: String,
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
