function isLoggin(req, res, next) {
    if (req.session.user) return next()
    else {
        req.flash("danger", "you not login, please login first")
        res.redirect("/user/login")
    }
}

function logout(req, res, next) {
    req.session.destroy()
    return res.redirect("/home")
}

export { isLoggin, logout }
