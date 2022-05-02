const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  
  productReviews:[{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },

    review:{
      type:Number,
      required:true
    },
    comment: {
      type: String,
      required: true,
      
    },
    reviewDate: { type: Date, default: Date.now },
    
  }],
  numReview:{type:Number,default:0},
  rating:{type:Number,default:0},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("products", reviewSchema);
