import express from "express"
import {
    edit,
    login,
    register,
    renderEdit,
    renderLogin,
    renderRegister,
    renderChangePassword,
    changePassword,
} from "../controller/user-controller.mjs"
import { isLoggin, logout } from "../utils/middleware/isLoggin.mjs"

const Router = express.Router()

Router.get("/login", renderLogin)
Router.get("/register", renderRegister)
Router.get("/edit", isLoggin, renderEdit)

Router.put("/edit/:id", isLoggin, edit)
Router.post("/login", login)
Router.post("/register", register)
Router.get("/logout", logout)

Router.get("/change-password", isLoggin, renderChangePassword)
Router.post("/change-password", isLoggin, changePassword)

export default Router
