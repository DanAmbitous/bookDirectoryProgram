if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

app.set("view engine", "ejs")
app.set("views", `${__dirname}/views`)
app.set("layout", "layouts/layout") //sets the file (layout) within the folder (layouts) to the layout of the web app so that certain HTML wouldn't be repeated
app.use(expressLayouts)
app.use(express.static("public")) //Contains the public content e.g. js, css, images, etc.
app.use(express.urlencoded({ extended: false }))

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
})

const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () =>
  console.log("Connected to Mongoose - http://localhost:3000/")
)

// Routers
const defaultRouter = require("./routes/default")
const authorRouter = require("./routes/author")
const bookRouter = require("./routes/book")

app.use("/", defaultRouter)
app.use("/author", authorRouter)
app.use("/book", bookRouter)

app.listen(process.env.PORT || 3000)
