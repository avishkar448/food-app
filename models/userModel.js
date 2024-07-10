const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"], //validation message
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Paaword is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone number is require"],
    },
    usertype: {
      type: String,
      required: [true, "usertype is required"],
      default: "client",
      enum: ["client", "admin", "vender", "driver"],
    },
    profile: {
      type: String,
      default: "xyz.png",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

mongoose.pluralize(null);
//export
module.exports = mongoose.model("User", userSchema);
