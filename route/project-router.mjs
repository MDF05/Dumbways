import {
    deleteProject,
    updatePage,
    postProject,
    renderProject,
    updateProject,
    detailProject,
} from "../controller/project-controller.mjs"
import express from "express"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const Router = express.Router()

Router.get("/", renderProject)
Router.get("/detail/:id", detailProject)
Router.get("/:id", updatePage)

Router.post("/", upload.single("imageProject"), postProject)
Router.delete("/:id", deleteProject)
Router.put("/:id", upload.single("imageProject"), updateProject)

export default Router
