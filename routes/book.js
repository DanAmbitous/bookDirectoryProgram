const express = require("express")
const router = express.Router()

const path = require("path")
const fs = require("fs")

const Book = require("../models/bookModule")
const Author = require("../models/authorModel")

const multer = require("multer")
const uploadPath = path.join("public", Book.coverImageBasePath)
//All accepted file types
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"]
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    //First para is for error, thus is null there isn't an error
    callback(null, imageMimeTypes.includes(file.mimetype))
  },
})

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (error) => {
    if (error) console.log(error)
  })
}

//All books router
router.get("/", async (req, res) => {
  res.send("All books")
})

//New book router
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book())
})

//Create book router
router.post("/", upload.single("cover"), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description,
  })

  try {
    const savedBook = await book.save()
    // console.log(savedBook)
    res.redirect("/book")
  } catch {
    // setTimeout(() => {
    if (book.coverImageName != null) removeBookCover(book.coverImageName)
    // }, 1000)

    renderNewPage(res, new Book(), true)
  }
})

async function renderNewPage(res, book, hasError = false) {
  try {
    const author = await Author.find({})

    const params = {
      authors: author,
      books: book,
    }

    if (hasError) params.errorMessage = "Error creating book"

    res.render("book/new", params)
  } catch {
    res.redirect("/book")
  }
}

module.exports = router
