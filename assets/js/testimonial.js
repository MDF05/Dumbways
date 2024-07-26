const starsRadio = document.querySelectorAll("input[name='star']")
const labels = document.querySelectorAll(".star")

starsRadio.forEach((radio,index) => {
    radio.addEventListener("change", () => {
        labels.forEach(e => {
            e.style.filter = "grayscale(100%) drop-shadow(3px -3px 2px white)"
        })
        
        for(let i =0; i < index + 1; i++) {
            labels[i].style.filter = "grayscale(0) drop-shadow(1px -1px 2px black)"
        }

    })
})
