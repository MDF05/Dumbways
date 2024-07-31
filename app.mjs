import express from "express"
import dotenv from "dotenv"
import CreateError from "./utils/throwError.mjs"
import path from "path"
import ejs from "ejs"
import expressEjsLayouts from "express-ejs-layouts"

import homeRouter from "./route/home-router.mjs"
import contactRouter from "./route/contact-router.mjs"
import testimoniRouter from "./route/testimoni-router.mjs"
import myProjectRouter from "./route/myproject-router.mjs"

dotenv.config()
const app = express()
const port = process.env.port || 3000
const version = "v1"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/assets", express.static("assets"))
app.set("view engine", ejs)
app.set("views", "views")
app.set("view cache", true)

app.use(expressEjsLayouts)

app.use(`/${version}/home`, homeRouter)
app.use(`/${version}/contact`, contactRouter)
app.use(`/${version}/testimoni`, testimoniRouter)
app.use(`/${version}/myproject`, myProjectRouter)

app.get("/", (req, res, next) => {
    return res.json({
        author: "muhammad dava fahreza",
        succes: true,
        version: version,
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
