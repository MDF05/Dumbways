import session from "express-session"
import UserModel from "../model/User-Model.mjs"
import calculateAgePost from "../utils/project-utils/agePost.mjs"
import datePostConvert from "../utils/project-utils/datePostConvert.mjs"
import deleteImage from "../utils/project-utils/deleteImage.mjs"
import saveImage from "../utils/project-utils/saveImage.mjs"
import bcrypt from "bcrypt"
import TestimoniModel from "../model/testimoni-model.mjs"
const saltRounds = 10

async function renderLogin(req, res, next) {
    try {
        return res.render("user-page/login.ejs", {
            layout: "partials/template.ejs",
            pageActive: "user",
            session: false,
        })
    } catch (err) {
        return res.redirect("/user/login")
    }
}

async function renderRegister(req, res, next) {
    try {
        return res.render("user-page/register.ejs", {
            layout: "partials/template.ejs",
            pageActive: "user",
            session: false,
        })
    } catch (err) {
        return res.redirect("/user/register")
    }
}

async function renderEdit(req, res, next) {
    try {
        const user = req.session.user
        const date = new Date(user.user.createAt)
        const birtday = new Date(user.user.dateOfBirth)
        const monthbd =
            birtday.getMonth().length > 1 ? birtday.getMonth() + 1 : `0${birtday.getMonth() + 1}`
        const defaultBirth = `${birtday.getFullYear()}-${monthbd}-${birtday.getDate()}`

        return res.render("user-page/edit.ejs", {
            layout: "partials/template.ejs",
            pageActive: "edit",
            session: user,
            createAt: datePostConvert(user.user.createAt),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            defaultBirth,
        })
    } catch (err) {
        return res.redirect("/user/edit")
    }
}

async function login(req, res, next) {
    try {
        const { password, email } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) {
            req.flash("danger", "email not found or you not registered")
            return res.redirect("/user/login")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            req.flash("danger", "password not correct or username not correct")
            return res.redirect("/user/login")
        }

        req.session.user = { user }
        req.flash("succes", "succesfully login")
        return res.redirect("/home")
    } catch (err) {
        req.session.user = false
        req.flash("danger", err.message)
        return res.redirect("/user/login")
    }
}

async function register(req, res, next) {
    try {
        const { name, password, email } = req.body

        const existUser = await UserModel.findOne({ name })
        if (existUser) {
            req.flash("danger", `${name} name was already exist, please use other name`)
            return res.redirect("/user/register")
        }

        const existEmail = await UserModel.findOne({ email })
        if (existEmail) {
            req.flash("danger", `${email} email was already exist, please use another email`)
            return res.redirecct("/user/register")
        }

        const hashPassword = await bcrypt.hash(password, saltRounds)

        const extensionFile = req.file.mimetype.split("/")[1]
        const nameFile = `${name} - ${new Date().getTime()}.${extensionFile}`
        const imageUrl = `assets/user/${nameFile}`

        saveImage(req.file.buffer, "../../assets/user/", nameFile)
        const user = UserModel({
            name,
            password: hashPassword,
            email,
            imageUrl,
            createAt: new Date(),
            dateOfBirth: new Date(),
        })

        await user.save()
        req.flash("succes", "successfully registered, then loggin first")
        return res.redirect("/user/login")
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("/user/register")
    }
}

async function edit(req, res, next) {
    try {
        const id = req.params.id
        const { name, email, address, gender, dateOfBirth, hobby, role, description } = req.body

        const oldUser = await UserModel.findOne({ _id: id })
        deleteImage(oldUser.imageUrl)

        const extensionFile = req.file.mimetype.split("/")[1]
        const nameFile = `${name} - ${new Date().getTime()}.${extensionFile}`
        const imageUrl = `assets/user/${nameFile}`

        saveImage(req.file.buffer, "../../assets/user/", nameFile)

        const update = {
            name,
            email,
            address,
            gender,
            dateOfBirth,
            imageUrl,
            hobby,
            role,
            description,
        }

        await UserModel.updateOne({ _id: id }, { $set: update })
        const user = await UserModel.findOne({ _id: id })
        req.session.user = { user }
        req.flash("succes", "succesfuly updated user")
        return res.redirect("/user/edit")
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("/user/edit")
    }
}

async function renderChangePassword(req, res, next) {
    try {
        const user = req.session.user
        res.render("user-page/change-password.ejs", {
            layout: "partials/template.ejs",
            pageActive: "change password",
            session: user,
        })
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("/user/login")
    }
}

async function changePassword(req, res, next) {
    try {
        const user = req.session.user
        const { oldPassword, newPassword } = req.body
        const findUser = await UserModel.findOne({ _id: user.user._id })

        if (!findUser) {
            req.flash("danger", "user not found and please login again ")
            return res.redirect("/user/change-password")
        }

        const checkPassword = await bcrypt.compare(oldPassword, findUser.password)
        if (!checkPassword) {
            req.flash("danger", "old password doesn't match")
            return res.redirecct("/user/change-password")
        }

        await TestimoniModel.updateOne({ _id: user._id }, { $set: { password: newPassword } })

        req.flash("succes", "password has been changed")
        return res.redirect("/user/change-password")
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("/user/change-password")
    }
}

export {
    login,
    register,
    edit,
    renderLogin,
    renderRegister,
    renderEdit,
    renderChangePassword,
    changePassword,
}
