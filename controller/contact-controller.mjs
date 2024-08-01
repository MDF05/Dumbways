import createError from "../utils/middleware/throwError.mjs"

function renderContactPage(req, res, next) {
    try {
        return res.render("contact.ejs", { layout: "partials/template.ejs" })
    } catch (error) {
        return next(createError(400, "bad request"))
    }
}

export { renderContactPage }
