import fs from "fs"

import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function deleteImage(name) {
    fs.rm(name, (err) => {
        if (err) throw err

        return true
    })
}
