const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description",
  },
})

//Author is the name of the table within the db
module.exports = mongoose.model("Author", authorSchema)
