import UserModel from "../model/User-Model.mjs"

function Login(req, res, next) {
    const { name, password, email } = req.body
    const user = UserModel.findOne({ name })
}

function register(req, res, next) {}
