const mongoose = require("mongoose")

const coverImageBasePath = "upload/bookCover"

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    requird: true,
  },
  description: {
    type: String,
    default: "",
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
module.exports.coverImageBasePath = coverImageBasePath
