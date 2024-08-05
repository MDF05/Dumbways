export default function durationProject(start, end) {
    const timeStart = new Date(start)
    const timeEnd = new Date(end)
    const duration = Math.floor((timeEnd - timeStart) / (1000 * 60 * 60))

    const day = Math.floor(duration / 24)
    const month = Math.floor(day / 30)
    const years = Math.floor(month / 12)
    const monthYears = Math.ceil(years % 12)

    if (years > 0) return `${years} years ${monthYears !== 0 ? `and ${monthYears} month` : ``}`
    else if (month > 0) return `${month} months`
    else return `${day} days`
}
