import createError from "../utils/throwError.mjs"
import datePostConvert from "../utils/myproject/datePostConvert.mjs"
import calculateAgePost from "../utils/myproject/agePost.mjs"
import durationProject from "../utils/myproject/durationProject.mjs"
import saveImage from "../utils/myproject/saveImage.mjs"
import deleteImage from "../utils/myproject/deleteImage.mjs"

let listProject = []

function renderMyprojectPage(req, res, next) {
    try {
        res.render("myproject.ejs", { layout: "partials/template.ejs", listProject })
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
            imageProject: `/assets/myproject/${name}.jpg`,
            duration: durationProject(startDate, endDate),
            postAt: datePostConvert(new Date()),
            agePost: calculateAgePost(new Date()),
        }

        listProject.push(project)
        saveImage(req.file.buffer, req.body.name)
        // http://localhost:3000/assets/form-image/dava.jpg

        res.redirect("/v1/myproject")
    } catch (err) {
        return next(createError(400, err.message))
    }
}

async function deleteMyProject(req, res, next) {
    try {
        const id = req.params.id
        deleteImage(listProject[id].name)
        delete listProject[id]
        return res.redirect("/v1/myproject")
    } catch (err) {
        next(createError(400, err.message))
    }
}

async function getOneProject(req, res, next) {
    try {
        const id = req.params.id
        const project = listProject[id]

        console.log(project)
        return res.render("update.ejs", { layout: "partials/template.ejs", project })
    } catch (err) {
        next(createError(400, err.message))
    }
}

export { renderMyprojectPage, postMyProject, deleteMyProject, getOneProject }
