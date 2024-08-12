import createError from "../utils/middleware/throwError.mjs"
import datePostConvert from "../utils/project-utils/datePostConvert.mjs"
import calculateAgePost from "../utils/project-utils/agePost.mjs"
import durationProject from "../utils/project-utils/durationProject.mjs"
import saveImage from "../utils/project-utils/saveImage.mjs"
import deleteImage from "../utils/project-utils/deleteImage.mjs"
import ProjectModel from "../model/project-model.mjs"

async function renderProject(req, res, next) {
    try {
        const user = req.session.user.user
        const Projects = (await ProjectModel.find({ userid: user._id })) || []
        Projects?.reverse()

        const session = req.session.user
        res.render("project-page/project.ejs", {
            layout: "partials/template.ejs",
            Projects,
            calculateAgePost,
            pageActive: "project",
            session,
        })
    } catch (err) {
        res.redirect("project")
    }
}

async function postProject(req, res, next) {
    try {
        const user = req.session.user.user
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
        const nameFile = `${name} - ${new Date().getTime()}.${extensionFile}`
        const imageUrl = `assets/project/${nameFile}`

        const Project = new ProjectModel({
            name,
            startDate,
            endDate,
            description,
            checkNode,
            checkReact,
            checkJavascript,
            checkSocket,
            imageProject: imageUrl,
            postAt: datePostConvert(new Date()),
            agePost: new Date(),
            duration: durationProject(startDate, endDate),
            userid: user._id,
        })

        saveImage(req.file.buffer, "../../assets/project/", nameFile)
        await Project.save()

        req.flash("succes", "succesfully add new project")
        return res.redirect("/project")
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("project")
    }
}

async function deleteProject(req, res, next) {
    try {
        const id = req.params.id
        const findProject = await ProjectModel.findOne({ _id: id })
        deleteImage(findProject.imageProject)
        await ProjectModel.deleteOne({ _id: id })
        req.flash("succes", "project has been deleted")
        return res.redirect("/project")
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("project")
    }
}

async function updatePage(req, res, next) {
    try {
        const id = req.params.id
        const Project = await ProjectModel.findOne({ _id: id })

        const session = req.session.user
        return res.render("project-page/update-project.ejs", {
            layout: "partials/template.ejs",
            Project,
            pageActive: "project",
            session,
        })
    } catch (err) {
        return res.redirect("project")
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
        const nameFile = `${name} - ${new Date().getTime()}.${extensionFile}`
        const imageUrl = `assets/project/${nameFile}`

        const updatedProject = {
            name,
            startDate,
            endDate,
            description,
            checkJavascript,
            checkNode,
            checkSocket,
            checkReact,
            imageProject: imageUrl,
            duration: durationProject(startDate, endDate),
        }

        const id = req.params.id
        const oldProject = await ProjectModel.findOne({ _id: id })
        deleteImage(oldProject.imageProject)

        await ProjectModel.updateOne({ _id: id }, { $set: updatedProject })
        saveImage(req.file.buffer, "../../assets/project/", nameFile)

        req.flash("succes", "succesfully update the project")
        return res.redirect("/project")
    } catch (err) {
        req.flash("error", `failed to update the project ${err.message}`)
        return res.redirect("project")
    }
}

async function detailProject(req, res, next) {
    try {
        const id = req.params.id
        const Project = await ProjectModel.findOne({ _id: id })
        const session = req.session.user
        return res.render("project-page/detail-project.ejs", {
            layout: "partials/template.ejs",
            Project,
            pageActive: "project",
            session,
        })
    } catch (err) {
        req.flash("error", err.message)
        return res.redirect(`/project`)
    }
}

export { renderProject, postProject, deleteProject, updatePage, updateProject, detailProject }
