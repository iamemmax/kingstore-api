const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },

  productImgs: [],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId,

    // ref: "category",
    type: String,
    required: true,
    trim: true,
  },

  brand: {
    type: String,
    required: true,
    trim: true,
  },
  totalQty: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("products", productSchema);
