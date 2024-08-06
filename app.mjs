import express from "express"
import dotenv from "dotenv"
import CreateError from "./utils/middleware/throwError.mjs"
import path from "path"
import expressEjsLayouts from "express-ejs-layouts"


dotenv.config()
const app = express()
const port = process.env.port || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(expressEjsLayouts)
app.use("/assets", express.static("assets"))
app.set("view engine", "ejs")
app.set("views", "views")
app.set("view cache", true)


app.get("/", (req, res, next) => {
    return res.json({
        author: "muhammad dava fahreza",
        succes: true,
    })
})


app.use("/", (req, res, next) => {
    return next(CreateError(404, "page not found"))
})

app.use((err, req, res, next) => {
    const status = err.status
    const message = err.message
    const errorStack = err.stack
    const succes = false

    return res.status(status).json({
        status,
        message,
        errorStack,
        succes,
    })
})

app.listen(port, () => console.log(`your app listening on http://localhost:${port}`))
