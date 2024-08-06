import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
export const version = "v1"

app.get("/", (req, res, next) => {
    res.json({
        author: "muhammad dava fahreza",
        succes: true,
        version,
    })
})

app.listen(8000, () => {
    console.log("your app is running ")
})
