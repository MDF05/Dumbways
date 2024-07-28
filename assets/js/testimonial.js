/** @format */

let dataTestimoni = []

getDataTestimoni().then((succes) => {
    dataTestimoni = succes.Testimoni
    renderTestimoni()
})

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

filterStar.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        labelFilterImg.forEach(
            (e) =>
                (e.style.filter =
                    "drop-shadow(1px 1px grey) drop-shadow(-1px -1px grey) grayscale(100%)"),
        )
        labelResetRating.style.filter = "grayscale(100%)"

        for (let i = 0; i < index + 1; i++) {
            labelFilterImg[i].style.filter =
                "drop-shadow(1px 1px grey) drop-shadow(-1px -1px grey) grayscale(0%)"
        }
    })
})

resetRating.addEventListener("change", () => {
    labelResetRating.style.filter = "grayscale(0%)"
    labelFilterImg.forEach(
        (e) =>
            (e.style.filter =
                "drop-shadow(1px 1px grey) drop-shadow(-1px -1px grey) grayscale(100%)"),
    )
})

function convertUrl(url) {
    const ReaderUrl = new FileReader()
    ReaderUrl.readAsDataURL(url)

    return new Promise((resolve, reject) => {
        ReaderUrl.onerror = () => {
            return reject(ReaderUrl.error)
        }

        ReaderUrl.onload = () => {
            return resolve(ReaderUrl.result)
        }
    })
}

async function sendDataForm() {
    const inputName = document.querySelector("input#name").value
    const inputDeskripsi = document.querySelector("textarea#deskripsi").value
    const inputFile = document.querySelector("input#input-file")?.files[0]
    const inputStar = document.querySelector("input[name='star']:checked")?.value

    let alertMessage = ""
    if (inputName == "") alertMessage += `tolong isikan name terlebih dahulu \n`
    if (inputDeskripsi == " ") alertMessage += `tolong isikan deskripsi terlebih dahulu \n`
    if (inputFile == undefined) alertMessage += `tolong input gambar terlebih dahulu \n`
    if (inputStar == undefined) alertMessage += `tolong berikan rating terlebih dahulu `

    if (alertMessage.length !== 0) return alert(alertMessage)

    let dataForm = {
        author: inputName,
        deskripsi: inputDeskripsi,
        image: await convertUrl(inputFile),
        star: inputStar,
        datePost: new Date(),
    }

    try {
        dataTestimoni.push(dataForm)
        alert(await postDataTestimoni(dataForm))
        return renderTestimoni()
    } catch (err) {
        return alert(err)
    }
}

function postDataTestimoni(data) {
    const FormInput = new FormData()
    FormInput.append("dataForm", JSON.stringify(data))

    return new Promise((resolve, reject) => {
        const Ajax = new XMLHttpRequest()
        Ajax.open("POST", "https://dumbways-backend.vercel.app/testimoni")

        Ajax.onload = function () {
            const response = JSON.parse(Ajax.responseText)
            if (response.succes == true) {
                return resolve(`congratulation,the testimonial has been stored successfully`)
            } else return reject(`${response.message}`)
        }

        Ajax.onerror = function () {
            return reject("network error or bad connection")
        }

        Ajax.send(FormInput)
    })
}

function getDataTestimoni() {
    return new Promise((resolve, reject) => {
        try {
            const Ajax = new XMLHttpRequest()
            Ajax.open("GET", "https://dumbways-backend.vercel.app/testimoni")

            Ajax.onload = () => {
                const response = JSON.parse(Ajax.responseText)
                if (response.succes == true) return resolve(response.data)
                else return reject("failed to fetch database")
            }

            Ajax.send()
        } catch (err) {
            return reject(err.message)
        }
    })
}

function deleteTestimoni(id, index) {
    return new Promise((resolve, reject) => {
        try {
            const Ajax = new XMLHttpRequest()
            Ajax.open("DELETE", `https://dumbways-backend.vercel.app/testimoni/${id}`)

            Ajax.onload = () => {
                const response = JSON.parse(Ajax.responseText)
                if (response.succes == true) return resolve("testimoni has been deleted")
                else return reject("failed to deleted testimoni")
            }

            Ajax.send()
        } catch (err) {
            return reject(err.message)
        }
    })
}

function renderTestimoni() {
    containerTestimoni.innerHTML = ""
    dataTestimoni.forEach((testimoni, index) => {
        containerTestimoni.innerHTML += `
             <div class="testimoni">
                    <div class="header">
                        <img src="${testimoni.image}" alt="" />
                    </div>
                    <div class="body">
                        <div>
                            <p class="description">"${testimoni.deskripsi}"</p>
                            <h4 class="judul">-${testimoni.author}</h4>
                        </div>
                        <div class="rating-star">
                            <span class="teks-star">${testimoni.star}</span>
                            <span class="container-rating-card"> 
                                <span class="span-star">
                                    ${cardStarColor(testimoni.star)}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="post-date">post : ${datePostConvert(testimoni.datePost)} </div>
                        <div class="age-post">${agePost(testimoni.datePost)}</div>
                        <div class="navigasi-testimoni" id=${testimoni._id} index=${index}>
                            <button class="delete-testimoni">delete</button>
                            <button class="update-testimoni">update</button>
                        </div>
                    </div>
                </div>
        `
    })

    return true
}

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

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-testimoni")) {
        try {
            const parent = event.target.parentElement
            const id = parent.getAttribute("id")
            const index = parent.getAttribute("index")
            deleteConfirm = confirm(`apakah kamu yakin menghapus testimoni ini`)
            if (deleteConfirm) {
                deleteTestimoni(id, index)
                    .then((succes) => {
                        delete dataTestimoni[index]
                        renderTestimoni()
                        return alert(succes)
                    })
                    .catch((err) => alert(err))
            } else return alert("batal menghapus testimoni")
        } catch (err) {
            alert(err)
        }
    }
})

function datePostConvert(datePost) {
    let nameOfMonth = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ]

    const DatePost = new Date(datePost)
    const date = DatePost.getDate()
    const month = nameOfMonth[DatePost.getMonth()]
    const year = DatePost.getFullYear()

    return `${date} - ${month} - ${year}`
}

function agePost(datePost) {
    const DateNow = new Date()
    const postDate = new Date(datePost)
    const distanceDate = DateNow - postDate

    const distanceYear = Math.floor(distanceDate / 1000 / 60 / 60 / 24 / 365)
    const distanceDay = Math.floor(distanceDate / 1000 / 60 / 60 / 24)
    const distanceHour = Math.floor(distanceDate / 1000 / 60 / 60)
    const distanceMinute = Math.floor(distanceDate / 1000 / 60)
    const distanceSecond = Math.floor(distanceDate / 1000)

    if (distanceYear > 0) return `${distanceYear} Years Ago`
    else if (distanceDay > 0) return `${distanceDay} Days Ago`
    else if (distanceHour > 0) return `${distanceHour} Hours Ago`
    else if (distanceMinute > 0) return `${distanceMinute} minute Ago`
    else if (distanceSecond > 0) return `${distanceSecond} Second Ago`
    else return `just now`
}

function filterTestimoni(countStar) {
    const checkStar = dataTestimoni.filter((data) => {
        return data.star == countStar
    })

    containerTestimoni.innerHTML = ""
    checkStar.forEach((testimoni, index) => {
        containerTestimoni.innerHTML += `
             <div class="testimoni">
                    <div class="header">
                        <img src="${testimoni.image}" alt="" />
                    </div>
                    <div class="body">
                        <div>
                            <p class="description">"${testimoni.deskripsi}"</p>
                            <h4 class="judul">-${testimoni.author}</h4>
                        </div>
                        <div class="rating-star">
                            <span class="teks-star">${testimoni.star}</span>
                             <span class="container-rating-card"> 
                                <span class="span-star">
                                    ${cardStarColor(testimoni.star)}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="post-date">post : ${datePostConvert(testimoni.datePost)} </div>
                        <div class="age-post">${agePost(testimoni.datePost)}</div>
                        <div class="navigasi-testimoni" id=${testimoni._id} index=${index}>
                            <button class="delete-testimoni">delete</button>
                            <button class="update-testimoni">update</button>
                        </div>
                    </div>
                </div>
        `
    })
}

const ratingByStar = document.querySelectorAll(".filter-star")
const allRating = document.querySelector("#reset-rating")

ratingByStar.forEach((ratingElement) => {
    ratingElement.addEventListener("change", (event) => {
        checkedRating = document.querySelector(".filter-star:checked").value
        filterTestimoni(checkedRating)
    })
})

resetRating.addEventListener("change", (event) => {
    renderTestimoni()
})

submitTestimoni.addEventListener("click", (event) => {
    event.preventDefault()
    sendDataForm()
})
