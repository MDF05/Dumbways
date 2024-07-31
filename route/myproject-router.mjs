import {
    deleteMyProject,
    getOneProject,
    postMyProject,
    renderMyprojectPage,
} from "../controller/myproject-controller.mjs"
import express from "express"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const Router = express.Router()

Router.get("/", renderMyprojectPage)
Router.post("/", upload.single("imageProject"), postMyProject)
Router.post("/delete/:id", deleteMyProject)
Router.get("/update/:id", getOneProject)

export default Router
