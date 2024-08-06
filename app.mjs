import express from "express"
import dotenv from "dotenv"
import CreateError from "./utils/middleware/throwError.mjs"
import path from "path"
import ejs from "ejs"
import expressEjsLayouts from "express-ejs-layouts"

import homeRouter from "./route/home-router.mjs"
import contactRouter from "./route/contact-router.mjs"
import testimoniRouter from "./route/testimoni-router.mjs"
import myProjectRouter from "./route/myproject-router.mjs"

dotenv.config()
const app = express()
export const version = "v1"

app.get("/", (req, res, next) => {
    return res.json({
        author: "muhammad dava fahreza",
        succes: true,
        version: version,
    })
})

app.listen(8000, () => {
    console.log("your app is running ")
})
