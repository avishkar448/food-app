const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is requied"],
    },
    imageUrl: {
      type: String,
      default: "xyz.png",
    },
  },
  { timestamps: true }
);

mongoose.pluralize(null);
//export
module.exports = mongoose.model("Category", categorySchema);
