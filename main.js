const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

app.set("view engine", "ejs")
app.set("views", `${__dirname}/views`)
app.set("layout", "layouts/layout") //sets the file (layout) within the folder (layouts) to the layout of the web app so that certain HTML wouldn't be repeated
app.use(expressLayouts)
app.use(express.static("public")) //Contains the public content e.g. js, css, images, etc.

// Routers
const defaultRouter = require("./routes/default")

app.use("/", defaultRouter)

app.listen(process.env.PORT || 3000)
