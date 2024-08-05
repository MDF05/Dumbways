import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    checkNode: {
        type: String,
    },
    checkReact: {
        type: String,
    },
    checkJavascript: {
        type: String,
    },
    checkSocket: {
        type: String,
    },
    imageProject: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    agePost: {
        type: Date,
        required: true,
    },
    postAt: {
        type: String,
        required: true,
    },
})

const ProjectModel = new mongoose.model("project", ProjectSchema)

export default ProjectModel
