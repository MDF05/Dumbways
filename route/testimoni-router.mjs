import express from "express"
import { renderTestimonial } from "../controller/testimoni-controller.mjs"
const Router = express.Router()

Router.get("/", renderTestimonial)

export default Router
