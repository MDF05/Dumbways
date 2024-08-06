import createError from "../utils/middleware/throwError.mjs"
import datePostConvert from "../utils/myproject/datePostConvert.mjs"
import calculateAgePost from "../utils/myproject/agePost.mjs"
import durationProject from "../utils/myproject/durationProject.mjs"
import saveImage from "../utils/myproject/saveImage.mjs"
import deleteImage from "../utils/myproject/deleteImage.mjs"

let listProject = []

function renderMyprojectPage(req, res, next) {
    try {
        res.render("project.ejs", { layout: "partials/template.ejs", listProject })
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
        } = req.body

        const project = {
            name,
            startDate,
            endDate,
            description,
            checkNode,
            checkReact,
            checkJavascript,
            checkSocket,
            imageProject: `/assets/project/${name}.jpg`,
            duration: durationProject(startDate, endDate),
            postAt: datePostConvert(new Date()),
            agePost: calculateAgePost(new Date()),
        }

        listProject.push(project)
        saveImage(req.file.buffer, req.body.name)
        // http://localhost:3000/assets/form-image/dava.jpg

        return res.redirect("/project")
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function deleteMyProject(req, res, next) {
    try {
        const id = req.params.id
        deleteImage(listProject[id].name)
        delete listProject[id]
        return res.redirect("/project")
    } catch (err) {
        next(createError(400, err.message))
    }
}

async function getOneProject(req, res, next) {
    try {
        const id = req.params.id
        console.log(id)
        const project = listProject[id]

        return res.render("update.ejs", {
            layout: "partials/template.ejs",
            project,
            index: id,
        })
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function updateProject(req, res, next) {
    try {
        const id = req.params.id
        const oldProject = listProject[id]

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

        deleteImage(oldProject.name)
        saveImage(req.file.buffer, name)

        const updatedProject = {
            name,
            startDate,
            endDate,
            description,
            checkJavascript,
            checkNode,
            checkSocket,
            checkReact,
            imageProject: `/assets/project/${name}.jpg`,
            duration: durationProject(startDate, endDate),
            postAt: datePostConvert(new Date()),
            agePost: calculateAgePost(new Date()),
        }

        listProject[id] = updatedProject
        return res.redirect("/project")
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function detailProject(req, res, next) {
    try {
        res.render("detail-project.ejs", { layout: "partials/template.ejs", listProject })
    } catch (err) {
        return res.redirect("/project")
    }
}

export {
    renderMyprojectPage,
    postMyProject,
    deleteMyProject,
    getOneProject,
    updateProject,
    detailProject,
}
