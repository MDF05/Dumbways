import express from "express"
import path from "path"
import ejs from "ejs"
import expressEjsLayouts from "express-ejs-layouts"

const app = express()

app.get("/", (req, res, next) => {
    return res.json({
        author: "muhammad dava fahreza",
        succes: true,
    })
})

app.listen(3000, () => {
    console.log("your app is running ")
})
