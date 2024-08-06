import fs from "fs"

export default function saveImage(buffer, name) {
    fs.writeFile(`./assets/project/${name}.jpg`, buffer, (err) => {
        if (err) throw err

        return true
    })
}
