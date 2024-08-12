function cardStarColor(star) {
    let starImage = ""
    for (let i = 0; i < star; i++) {
        starImage += `
        <img src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000"
         class="star-yellow-card" alt="star"/>`
    }

    for (let a = star; a < 5; a++) {
        starImage += `
            <img src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000"
             class="star-grey-card" alt="star"/>`
    }

    return starImage
}

export default cardStarColor
