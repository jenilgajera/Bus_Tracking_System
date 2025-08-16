const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "parent", "admin", "driver"],
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["inactive", "active"], 
    },
  },
  { timestamps: true }
);

const user_model = mongoose.model("User", userSchema);

module.exports = user_model;
