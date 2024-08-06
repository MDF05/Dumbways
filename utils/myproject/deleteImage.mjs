import fs from "fs"

export default function deleteImage(name) {
    fs.rm(`./assets/project/${name}.jpg`, (err) => {
        if (err) throw err

        return true
    })
}
