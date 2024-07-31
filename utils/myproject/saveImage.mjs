import fs from "fs"

export default function saveImage(buffer, name) {
    fs.writeFile(`./assets/myproject/${name}.jpg`, buffer, (err) => {
        if (err) throw err

        return true
    })
}

fs.writeFileSync("asu.txt", "asyiap")
