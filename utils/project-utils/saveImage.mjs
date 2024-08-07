import fs from "fs"

import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function saveImage(buffer, folder, name) {
    const pathImage = path.join(__dirname, folder, name)
    fs.writeFile(pathImage, buffer, (err) => {
        if (err) throw err

        return true
    })
}
