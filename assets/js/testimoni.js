/** @format */

let dataTestimoni = []

// getDataTestimoni().then((succes) => {
//     dataTestimoni = succes.Testimoni
//     renderTestimoni()
// })

const starsRadio = document.querySelectorAll("input[name='star']")
const labelsImg = document.querySelectorAll(".star")
const resetRating = document.querySelector("#reset-rating")
const labelResetRating = document.querySelector(".all-star label")
const filterStar = document.querySelectorAll(".filter-star")
const labelFilterImg = document.querySelectorAll(".label-reset img")
const containerTestimoni = document.querySelector(".list-testimoni")
const submitTestimoni = document.querySelector(".add-testimoni")
const deleteTestimonis = document.querySelectorAll(".delete-testimoni")

starsRadio.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        labelsImg.forEach((e) => {
            e.style.filter =
                "grayscale(100%) drop-shadow(-1px -1px white) drop-shadow(1px 1px white)"
        })

        for (let i = 0; i < index + 1; i++) {
            labelsImg[i].style.filter =
                "grayscale(0%) drop-shadow(-.5px -.5px black) drop-shadow(1px 1px black)"
        }
    })
})

const ratingStar = document.querySelector(".rating-star")
const checkedStar = ratingStar.getAttribute("star")

if (checkedStar > 0) {
    labelResetRating.style.filter = "grayscale(100%)"
    for (let i = 0; i < checkedStar; i++) {
        labelFilterImg[i].style.filter =
            "drop-shadow(1px 1px grey) drop-shadow(-1px -1px grey) grayscale(0%)"
    }
}

const ratingByStar = document.querySelectorAll(".filter-star")
const allRating = document.querySelector("#reset-rating")

ratingByStar.forEach((ratingElement) => {
    ratingElement.addEventListener("change", async (event) => {
        checkedRating = document.querySelector(".filter-star:checked").value
        const a = document.createElement("a")
        a.href = `/testimoni?star=${checkedRating}`
        a.click()
    })
})

resetRating.addEventListener("change", () => {
    const a = document.createElement("a")
    a.href = `testimoni?star=0`
    a.click()
})
