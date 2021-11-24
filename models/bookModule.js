const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    requird: true,
  },
  description: {
    type: String,
    default: "Not Description",
  },
  publishDate: {
    type: Date,
    requird: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImageName: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
})

//Author is the name of the table within the db
module.exports = mongoose.model("Book", bookSchema)
