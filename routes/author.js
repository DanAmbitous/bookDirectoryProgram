const express = require("express")
const router = express.Router()

const Author = require("../models/authorModel")

//get all authors
router.get("/", (req, res) => {
  res.render("author/index")
})

// get all new authors
router.get("/new", (req, res) => {
  res.render("author/new", { author: new Author() })
})

//add a new author
router.post("/", async (req, res) => {
  //To create a new author
  const author = new Author({
    name: req.body.name,
    description: req.body.description,
  })

  //Saves it to db
  try {
    const newAuthor = await author.save()
    console.log(newAuthor)
    res.redirect("author")
  } catch (error) {
    res.render("author/new", {
      author: author,
      errorMessage: `Error: ${error}`,
    })
  }
})

module.exports = router
