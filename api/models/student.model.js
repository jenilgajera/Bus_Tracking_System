const mongoose = require("mongoose")

const studentsSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  enrollmentNumber:{
    type: String,
    required:true
  },
  parentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Parent",
    required:true
  },
  busNumber:{
    type: Number,
  },
  returnBusNumber:{
    type: Number,
    required:true
  },
  phoneNumber:{
    type: String,
    required:true
  },
  sam:{
    type: Number,
    required:true
  },
  busStop:{
    type: Number,
    required:true
  },
  status:{
    type: Number,
    required:true
  },
  validity:{
    type: Number,
    required:true
  },
  isExpired: {
    type: Boolean,
    required:true
  }
})

const Student = mongoose.model("Student",studentsSchema,{ timestamps: true })

module.exports = Student