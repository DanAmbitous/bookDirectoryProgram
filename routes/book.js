const express = require("express")
const router = express.Router()

const Book = require("../models/bookModule")
const Author = require("../models/authorModel")

//All books router
router.get("/", async (req, res) => {
  res.send("All books")
})

//New book router
router.get("/new", async (req, res) => {
  try {
    const author = await Author.find({})
    const book = new Book()

    res.render("book/new", { authors: author, books: book })
  } catch {}
})

//Create book router
router.post("/", async (req, res) => {
  res.send("Create book")
})

module.exports = router
