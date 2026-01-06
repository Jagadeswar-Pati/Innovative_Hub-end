const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    shortDescription: {
      type: String,
    },

    longDescription: {
      type: String, // HTML allowed
    },

    mrp: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    gstMode: {
      type: String,
      enum: ["including", "excluding"],
      default: "including",
    },

    gstPercentage: {
      type: Number,
      default: 18,
    },

    images: [
      {
        type: String, // Cloudinary / external URL
      },
    ],

    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock"],
      default: "in_stock",
    },

    stockQuantity: {
      type: Number,
      default: 0,
    },

    categories: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
