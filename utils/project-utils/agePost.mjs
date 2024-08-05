function calculateAgePost(datePost) {
    const ClassDatePost = new Date(datePost)
    const ClassNowDate = new Date()

    const distanceDate = ClassNowDate - ClassDatePost

    const distanceDay = Math.floor(distanceDate / 1000 / 60 / 60 / 24)
    const distanceHours = Math.floor(distanceDate / 1000 / 60 / 60)
    const distanceMinute = Math.floor(distanceDate / 1000 / 60)
    const distanceYears = Math.floor(distanceDay / 365)

    let agePost
    if (distanceYears > 0) agePost = `${distanceYears} years ago`
    else if (distanceDay > 0) agePost = `${distanceDay} day ago`
    else if (distanceHours > 0) agePost = `${distanceHours} hours ago`
    else if (distanceMinute > 0) agePost = `${distanceMinute} minute ago`
    else agePost = `now`

    return agePost
}

export default calculateAgePost
