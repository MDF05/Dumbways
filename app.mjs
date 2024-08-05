import express from "express"
import dotenv from "dotenv"
import CreateError from "./utils/middleware/throwError.mjs"
import ejs from "ejs"
import expressEjsLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import session from "express-session"
import cookieParser from "cookie-parser"
import methodOverride from "method-override"

import homeRouter from "./route/home-router.mjs"
import contactRouter from "./route/contact-router.mjs"
import testimoniRouter from "./route/testimoni-router.mjs"
import myProjectRouter from "./route/project-router.mjs"

dotenv.config()
const app = express()
const port = process.env.port || 3000
export const version = "v1"

app.use(methodOverride("_method"))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(expressEjsLayouts)
app.use("/assets", express.static("assets"))
app.use("/bootstrap", express.static("node_modules/bootstrap/dist/css"))
app.set("view engine", ejs)
app.set("views", "views")
app.set("view cache", true)

app.use(
    session({
        secret: "dumbwa cat",
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    }),
)

app.use(`/${version}/home`, homeRouter)
app.use(`/${version}/contact`, contactRouter)
app.use(`/${version}/testimoni`, testimoniRouter)
app.use(`/${version}/project`, myProjectRouter)

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

app.listen(port, async () => {
    try {
        await mongoose.connect(process.env.database)
        console.log(`your app listening on http://localhost:${port}`),
            console.log(`berhasil connect ke database`)
    } catch (err) {
        console.log(err.message)
    }
})
