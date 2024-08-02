import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    startDate: {
        type: String,
        // required: true,
    },
    endDate: {
        type: String,
        // required: true,
    },
    checkNode: {
        type: String,
        // required: true,
    },
    checkReact: {
        type: String,
        // required: true,
    },
    checkJavascript: {
        type: String,
        // required: true,
    },
    checkSocket: {
        type: String,
        // required: true,
    },
    imageProject: {
        type: String,
        // required: true,
    },
    duration: {
        type: String,
        // required: true,
    },
    agePost: {
        type: Date,
        // required: true,
    },
    postAt: {
        type: String,
        // required: true,
    },
})

const ProjectModel = new mongoose.model("project", ProjectSchema)

export default ProjectModel
