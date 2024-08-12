import TestimoniModel from "../model/testimoni-model.mjs"
import createError from "../utils/middleware/throwError.mjs"
import saveImage from "../utils/project-utils/saveImage.mjs"
import deleteImage from "../utils/project-utils/deleteImage.mjs"
import cardStarColor from "../utils/testimoni-utils/cardStarColor.mjs"
import datePostConvert from "../utils/project-utils/datePostConvert.mjs"
import agePost from "../utils/project-utils/agePost.mjs"

async function renderTestimonial(req, res, next) {
    try {
        const user = req.session.user
        const filterStar = req.query.star || 0
        let Testimoni = []
        if (filterStar > 0) {
            Testimoni = await TestimoniModel.find({ userId: user.user._id, star: filterStar })
        } else {
            Testimoni = await TestimoniModel.find({ userId: user.user._id })
        }

        return res.render("testimoni-page/testimoni.ejs", {
            layout: "partials/template.ejs",
            pageActive: "testimoni",
            Testimoni,
            session: user,
            cardStarColor,
            datePostConvert,
            agePost,
            filterStar,
        })
    } catch (error) {
        return next(createError(400, "bad request"))
    }
}

async function postTestimoni(req, res, next) {
    try {
        const { name, deskripsi, star } = req.body
        const user = req.session.user.user

        const extensionFile = req.file.mimetype.split("/")[1]
        const nameFile = `${name} - ${new Date().getTime()}.${extensionFile}`
        const imageUrl = `assets/testimoni/${nameFile}`

        saveImage(req.file.buffer, "../../assets/testimoni/", nameFile)

        const testimoni = new TestimoniModel({
            name,
            deskripsi,
            star,
            imageUrl,
            createAt: new Date(),
            userId: user._id,
        })

        await testimoni.save()

        req.flash("succes", "succesfully added new testimoni ")
        return res.redirect("/testimoni")
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("/testimoni")
    }
}

async function deleteTestimoni(req, res, next) {
    try {
        const id = req.params.id
        const testimoni = await TestimoniModel.findOne({ _id: id })
        deleteImage(testimoni.imageUrl)

        await TestimoniModel.deleteOne({ _id: id })

        req.flash("succes", "succesfully to delete the testimoni")
        return res.redirect("/testimoni")
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("/testimoni")
    }
}

async function updateTestimoni(req, res, next) {
    try {
        const user = req.session.user
        const id = req.params.id
        const { name, deskripsi, star } = req.body

        const extensionFile = req.file.mimetype.split("/")[1]
        const nameFile = `${name} - ${new Date().getTime()}.${extensionFile}`
        const imageUrl = `assets/testimoni/${nameFile}`

        const updateTestimoni = {
            name,
            deskripsi,
            star,
            imageUrl,
        }

        saveImage(req.file.buffer, "../../assets/testimoni/", nameFile)

        await TestimoniModel.updateOne({ _id: id }, { $set: updateTestimoni })

        req.flash("succes", "succes updated testimoni")
        return res.redirect("/testimoni")
    } catch (err) {
        req.flash("danger", `failed updated ${err.message}`)
        return res.redirect("/testimoni")
    }
}

async function updateTestimoniPage(req, res, next) {
    try {
        const id = req.params.id
        const Testimoni = await TestimoniModel.findOne({ _id: id })

        const user = req.session.user
        return res.render("testimoni-page/edit-testimoni.ejs", {
            layout: "partials/template.ejs",
            pageActive: "testimoni",
            Testimoni,
            session: user,
        })
    } catch (err) {
        req.flash("danger", err.message)
        return res.redirect("/testimoni")
    }
}

export { renderTestimonial, postTestimoni, deleteTestimoni, updateTestimoniPage, updateTestimoni }
