const express = require("express")
const router = express.Router()

const Author = require("../models/authorModel")

//get all authors
router.get("/", async (req, res) => {
  console.log(req.protocol)

  let searchOptions = {}

  //Check to see the query has a value name="the name" (name is in the URL), null checking is for going into that url without via the menu bar
  if (req.query.name != null && req.query.name.length > 0) {
    searchOptions.name = new RegExp(req.query.name, "i")
  }

  try {
    const author = await Author.find(searchOptions)

    res.render("author/index", {
      authors: author,
      searchOptions: req.query,
    })
  } catch (error) {
    res.redirect("/")
  }
})

//get all new authors
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
    await author.save()

    res.redirect("author")
  } catch (error) {
    res.render("author/new", {
      author: author,
      errorMessage: `Error: ${error}`,
      error: true,
    })
  }
})

module.exports = router
