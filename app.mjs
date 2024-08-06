import express from "express"
import dotenv from "dotenv"
import path from "path"
import ejs from "ejs"
import expressEjsLayouts from "express-ejs-layouts"

dotenv.config()
const app = express()
export const version = "v1"

app.get("/", (req, res, next) => {
    return res.json({
        author: "muhammad dava fahreza",
        succes: true,
        version,
    })
})

app.listen(8000, () => {
    console.log("your app is running ")
})
