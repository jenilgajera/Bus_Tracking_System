const mongoose = require("mongoose")

const driverSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
    },
  name:{
    type: String,
    required:true
  },
  licenceNumber:{
    type: String,
    required:true
  },
  assignedBus:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required:true
  } 
})

const Driver = mongoose.model("Driver",driverSchema,{ timestamps: true })

module.exports = Driver