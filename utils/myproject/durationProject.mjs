export default function durationProject(start, end) {
    const timeStart = new Date(start)
    const timeEnd = new Date(end)
    const duration = Math.floor((timeEnd - timeStart) / (1000 * 60 * 60 * 24 * 30))

    return duration
}
