import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "",
    },
    dateOfBirth: {
        type: Date,
    },
    hobby: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Obcaecati officia quas fugit laborum, delectus facilis laudantium illo minus dolor quisquam aliquam
                veniam optio totam libero natus sequi amet quasi possimus!
                Molestias quam voluptatum quidem impedit consequuntur expedita et laudantium qui sunt vero iste,
                laboriosam illum unde eius? Non est deleniti enim exercitationem molestias dignissimos placeat animi
                neque, quae error atque?`,
    },
    createAt: {
        type: Date,
        required: true,
    },
})

const UserModel = new mongoose.model("user", UserSchema)

export default UserModel
