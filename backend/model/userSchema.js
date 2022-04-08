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

  profile: [],
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
  state: {
    type: String,
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
