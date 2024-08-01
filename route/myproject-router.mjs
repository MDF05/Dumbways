import {
    deleteMyProject,
    getOneProject,
    postMyProject,
    renderMyprojectPage,
    updateProject,
} from "../controller/myproject-controller.mjs"
import express from "express"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const Router = express.Router()

Router.get("/", renderMyprojectPage)
Router.get("/update/:id", getOneProject)

Router.post("/", upload.single("imageProject"), postMyProject)
Router.post("/delete/:id", deleteMyProject)
Router.post("/update/:id", upload.single("imageProject"), updateProject)

export default Router
