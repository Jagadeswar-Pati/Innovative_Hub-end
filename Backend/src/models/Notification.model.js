const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["order", "user", "review", "system"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * ✅ VERY IMPORTANT
 * We MUST export a MODEL, not a schema
 * Otherwise deleteMany / insertMany will fail
 */
module.exports = mongoose.model("Notification", notificationSchema);
