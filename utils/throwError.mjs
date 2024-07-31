export default function createError(status = 404, message = "page not found") {
    const InfoError = new Error()
    InfoError.message = message
    InfoError.status = status
    return InfoError
}
