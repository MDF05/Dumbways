import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        Type: String,
        trim: true,
        unique: true,
        min: 1,
    },
    password: {
        required: true,
        Type: String,
        trim: true,
        unique: true,
        min: 1,
    },
    email: {
        required: true,
        Type: String,
        trim: true,
        unique: true,
        min: 1,
    },
})

const UserModel = new mongoose.Schema("user", UserSchema)

export default UserModel
