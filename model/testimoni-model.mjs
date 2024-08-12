import mongoose from "mongoose"

const TestimoniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

const TestimoniModel = new mongoose.model("testimoni", TestimoniSchema)

export default TestimoniModel
