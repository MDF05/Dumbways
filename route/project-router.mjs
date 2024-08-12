import {
    deleteProject,
    updatePage,
    postProject,
    renderProject,
    updateProject,
    detailProject,
} from "../controller/project-controller.mjs"
import express from "express"

const Router = express.Router()

Router.get("/", renderProject)
Router.get("/detail/:id", detailProject)
Router.get("/:id", updatePage)

Router.post("/", postProject)
Router.delete("/:id", deleteProject)
Router.put("/:id", updateProject)

export default Router
