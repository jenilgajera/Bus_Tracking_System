const mongoose = require("mongoose")

const parentSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
    },
  name:{
    type: String,
    required:true
  },
  phone:{
    type: String,
    required:true
  }
})

const Parent = mongoose.model("Parent",parentSchema,{ timestamps: true })

module.exports = Parent