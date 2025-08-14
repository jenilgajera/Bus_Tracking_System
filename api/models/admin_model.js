const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
    },
  name:{
    type: String,
    required:true
  },
  phoneNumber:{
    type: String,
    required:true
  },
  profileImage:{
    type: String,
    required:true
  } 
})

const Admin = mongoose.model("Admin",adminSchema,{ timestamps: true })

module.exports = Admin