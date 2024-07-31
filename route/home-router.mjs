import express from "express"
import { renderHome } from "../controller/home-controller.mjs"
const Router = express.Router()

Router.get("/", renderHome)

export default Router
