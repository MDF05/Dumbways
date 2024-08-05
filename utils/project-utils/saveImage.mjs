import fs from "fs"

export default function saveImage(buffer, name) {
    fs.writeFile(name, buffer, (err) => {
        if (err) throw err

        return true
    })
}
