const stars = document.querySelectorAll(".star")
const list = document.querySelector(".list-rating")

const starCount = list.getAttribute("star")

for (let i = 0; i < starCount; i++) {
    stars[i].style.filter = "drop-shadow(1px 1px grey) drop-shadow(-1px -1px grey) grayscale(0%)"
}
