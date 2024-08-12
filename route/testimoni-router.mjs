import express from "express"
import {
    deleteTestimoni,
    postTestimoni,
    renderTestimonial,
    updateTestimoniPage,
    updateTestimoni,
} from "../controller/testimoni-controller.mjs"
const Router = express.Router()

Router.get("/", renderTestimonial)
Router.get("/update/:id", updateTestimoniPage)
Router.put("/:id", updateTestimoni)
Router.post("/", postTestimoni)
Router.delete("/:id", deleteTestimoni)

export default Router
