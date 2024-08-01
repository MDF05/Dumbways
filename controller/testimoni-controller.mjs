import createError from "../utils/middleware/throwError.mjs"

function renderTestimonial(req, res, next) {
    try {
        return res.render("testimoni.ejs", { layout: "partials/template.ejs" })
    } catch (error) {
        return next(createError(400, "bad request"))
    }
}

export { renderTestimonial }
