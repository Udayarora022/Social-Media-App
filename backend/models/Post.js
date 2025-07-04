const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Post", postSchema)
