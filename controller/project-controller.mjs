import createError from "../utils/middleware/throwError.mjs"
import datePostConvert from "../utils/project-utils/datePostConvert.mjs"
import calculateAgePost from "../utils/project-utils/agePost.mjs"
import durationProject from "../utils/project-utils/durationProject.mjs"
import saveImage from "../utils/project-utils/saveImage.mjs"
import deleteImage from "../utils/project-utils/deleteImage.mjs"
import { version } from "../app.mjs"
import ProjectModel from "../model/project-model.mjs"

async function renderProject(req, res, next) {
    try {
        const Projects = await ProjectModel.find({})
        Projects?.reverse()

        res.render("project-page/project.ejs", {
            layout: "partials/template.ejs",
            Projects,
            version,
            calculateAgePost,
        })
    } catch (err) {
        next(createError(400, err.message))
    }
}

async function postProject(req, res, next) {
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

        const extensionFile = req.file.mimetype.split("/")[1]
        const nameFile = `assets/project/${name} - ${new Date().getTime()}.${extensionFile}`

        const Project = new ProjectModel({
            name,
            startDate,
            endDate,
            description,
            checkNode,
            checkReact,
            checkJavascript,
            checkSocket,
            imageProject: nameFile,
            postAt: datePostConvert(new Date()),
            agePost: new Date(),
            duration: durationProject(startDate, endDate),
        })

        saveImage(req.file.buffer, nameFile)
        await Project.save()
        // http://localhost:3000/assets/form-image/dava.jpg

        return res.redirect(`/${version}/project`)
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function deleteProject(req, res, next) {
    try {
        const id = req.params.id
        const findProject = await ProjectModel.findOne({ _id: id })
        deleteImage(findProject.imageProject)
        await ProjectModel.deleteOne({ _id: id })
        return res.redirect(`/${version}/project`)
    } catch (err) {
        next(createError(400, err.message))
    }
}

async function updatePage(req, res, next) {
    try {
        const id = req.params.id
        const Project = await ProjectModel.findOne({ _id: id })

        return res.render("project-page/update-project.ejs", {
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

        const extensionFile = req.file.mimetype.split("/")[1]
        const nameFile = `assets/myproject/${name} - ${new Date().getTime()}.${extensionFile}`

        const updatedProject = {
            name,
            startDate,
            endDate,
            description,
            checkJavascript,
            checkNode,
            checkSocket,
            checkReact,
            imageProject: nameFile,
            duration: durationProject(startDate, endDate),
        }

        const id = req.params.id
        const oldProject = await ProjectModel.findOne({ _id: id })
        deleteImage(oldProject.imageProject)

        await ProjectModel.updateOne({ _id: id }, { $set: updatedProject })
        saveImage(req.file.buffer, nameFile)

        return res.redirect(`/${version}/project`)
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function detailProject(req, res, next) {
    try {
        const id = req.params.id
        const Project = await ProjectModel.findOne({ _id: id })
        return res.render("project-page/detail-project.ejs", {
            layout: "partials/template.ejs",
            Project,
        })
    } catch (err) {
        return res.redirect(`/${version}/project`)
    }
}

export { renderProject, postProject, deleteProject, updatePage, updateProject, detailProject }
