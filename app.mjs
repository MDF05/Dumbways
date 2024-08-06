import express from "express"

const app = express()

app.get("/", (req, res, next) => {
    return res.json({
        author: "muhammad dava fahreza",
        succes: true,
    })
})

app.listen(8000, () => {
    console.log("your app is running ")
})
