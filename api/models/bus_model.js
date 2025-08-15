const mongoose = require("mongoose")

const busSchema = new mongoose.Schema({
  email:{
    type: String,
    required:true
    },
  password:{
    type: String,
    required:true
  },
  routes:{
    type: [String],
    required:true
  },
  number:{
    type: String,
    required:true
  }, 
  currentLocation:{
    type: {
      latitude : Number, 
      longitude: Number  
    },
    required:true
  } 
})

const Bus = mongoose.model("Bus",busSchema,{ timestamps: true })

module.exports = Bus