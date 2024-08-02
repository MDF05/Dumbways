import createError from "../utils/middleware/throwError.mjs"
import datePostConvert from "../utils/myproject/datePostConvert.mjs"
import calculateAgePost from "../utils/myproject/agePost.mjs"
import durationProject from "../utils/myproject/durationProject.mjs"
import saveImage from "../utils/myproject/saveImage.mjs"
import deleteImage from "../utils/myproject/deleteImage.mjs"
import { version } from "../app.mjs"
import ProjectModel from "../model/myproject-model.mjs"

async function renderMyprojectPage(req, res, next) {
    try {
        const Projects = await ProjectModel.find({})

        const messageError = req.flash("error")
        const messageSucces = req.flash("succes")

        console.log(messageSucces)
        console.log(messageError)

        res.render("myproject.ejs", {
            layout: "partials/template.ejs",
            Projects,
            version,
            messageError,
            messageSucces,
        })
    } catch (err) {
        next(createError(400, err.message))
    }
}

async function postMyProject(req, res, next) {
    try {
        const {
            name,
            startDate,
            endDate,
            description,
            checkNode,
            checkReact,
            checkJavascript,
            checkSocket,
            imageProject,
        } = req.body

        const Project = new ProjectModel({
            name,
            startDate,
            endDate,
            description,
            checkNode,
            checkReact,
            checkJavascript,
            checkSocket,
            imageProject: `assets/myproject/${name}.jpg`,
            postAt: datePostConvert(new Date()),
            agePost: new Date(),
            duration: durationProject(startDate, endDate),
        })

        saveImage(req.file.buffer, req.body.name)
        await Project.save()
        // http://localhost:3000/assets/form-image/dava.jpg

        req.flash("succes", "berhasil menambahkan project baru")
        return res.redirect("/v1/myproject")
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function deleteMyProject(req, res, next) {
    try {
        const id = req.params.id
        const findProject = await ProjectModel.findOne({ _id: id })
        deleteImage(findProject.name)
        await ProjectModel.deleteOne({ _id: id })
        return res.redirect("/v1/myproject")
    } catch (err) {
        next(createError(400, err.message))
    }
}

async function getOneProject(req, res, next) {
    try {
        const id = req.params.id
        const Project = await ProjectModel.findOne({ _id: id })

        return res.render("update.ejs", {
            layout: "partials/template.ejs",
            Project,
            version,
        })
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function updateProject(req, res, next) {
    try {
        const {
            name,
            startDate,
            endDate,
            description,
            checkJavascript,
            checkNode,
            checkSocket,
            checkReact,
        } = req.body

        const updatedProject = {
            name,
            startDate,
            endDate,
            description,
            checkJavascript,
            checkNode,
            checkSocket,
            checkReact,
            imageProject: `/assets/myproject/${name}.jpg`,
            duration: durationProject(startDate, endDate),
        }

        const id = req.params.id
        const oldProject = await ProjectModel.findeOne({ _id: id })
        deleteImage(oldProject.name)

        await ProjectModel.updateOne({ _id: id }, { $set: updatedProject })
        saveImage(req.file.buffer, name)

        return res.redirect("/v1/myproject")
    } catch (err) {
        return next(createError(400, err.message))
    }
}

export { renderMyprojectPage, postMyProject, deleteMyProject, getOneProject, updateProject }
