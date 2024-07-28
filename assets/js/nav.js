const buttons = document.querySelectorAll(".container-hamburger svg")
const listHamburger = document.querySelector(".container-nav-hamburger")

let navbarEvent = false

buttons.forEach(element => {
    element.addEventListener("click", (buton) => {
        buttons[0].classList.toggle("hidden")
        buttons[1].classList.toggle("hidden")
        navbarEvent ? listHamburger.style.top = "-124px" : listHamburger.style.top = "52px"
        navbarEvent = !navbarEvent
    })
})