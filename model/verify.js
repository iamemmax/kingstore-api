const mongoose = require("mongoose")
const verifySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        
    },
    
    token:{
        type:String,
        expires:666600
       
    },
     createdAt: { type: Date,  default: Date.now }
})
module.exports = mongoose.model("verify", verifySchema)