import createError from "../utils/middleware/throwError.mjs"

function renderContactPage(req, res, next) {
    try {
        const user = req.session.user
        return res.render("contact.ejs", {
            layout: "partials/template.ejs",
            pageActive: "contact",
            session: user,
        })
    } catch (error) {
        return next(createError(400, "bad request"))
    }
}

export { renderContactPage }
