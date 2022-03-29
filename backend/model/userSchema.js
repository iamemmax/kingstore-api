const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  profile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: String,
    enum: ["member", "admin"],
    default: "member",
  },
  phone: {
    type: Number,
  },
  posterCode: {
    type: Number,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },

  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("user", userSchema);
