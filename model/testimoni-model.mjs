import mongoose from "mongoose"

const testimoniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
})

const testimoniModel = new mongoose.model("testimoni", testimoniSchema)

export default testimoniModel
