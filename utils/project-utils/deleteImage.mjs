import fs from "fs"

export default function deleteImage(name) {
    fs.rm(name, (err) => {
        if (err) throw err

        return true
    })
}
