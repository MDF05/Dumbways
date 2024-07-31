import express from "express"
import { renderContactPage } from "../controller/contact-controller.mjs"
const Router = express.Router()

Router.get("/", renderContactPage)

export default Router
