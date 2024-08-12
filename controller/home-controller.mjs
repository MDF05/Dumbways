import createError from "../utils/middleware/throwError.mjs"

function renderHome(req, res, next) {
    try {
        return res.render("index.ejs", {
            layout: "partials/template.ejs",
            pageActive: "home",
            session: req?.session?.user,
        })
    } catch (error) {
        next(createError(400, "bad request"))
    }
}

export { renderHome }
