/** @format */

const form = document.querySelector("form")
containerTestimoni = document.querySelector(".list-testimoni")

let listTestimoni = JSON.parse(localStorage.getItem("listTestimoni")) || []

class Testimoni {
    constructor(name, deskripsi, imageUrl, datePost, countStar) {
        this.author = name
        this.message = deskripsi
        this.date = datePost
        this.url = imageUrl
        this.star = countStar
    }

    datePostConvert() {
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

        const DatePost = new Date(this.date)
        const day = DatePost.getDay()
        const month = nameOfMonth[DatePost.getMonth()]
        const year = DatePost.getFullYear()

        return `${day} - ${month} - ${year}`
    }

    agePost() {
        const DateNow = new Date()
        const distanceDate = DateNow - this.date

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

    elementHtml() {
        return `
            <div class="testimoni">
                    <div class="header">
                        <img src="${this.url}" alt="" />
                    </div>
                    <div class="body">
                        <div>
                            <p class="description">"${this.message}"</p>
                            <h4 class="judul">-${this.author}</h4>
                        </div>
                        <div class="rating-star">
                            <span class="teks-star">${this.star}</span>
                            <span class="span-star">
                                <img
                                src="https://img.icons8.com/?size=100&id=60003&format=png&color=000000"
                                alt="baru"
                                class="star" />
                            </span>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="post-date">post : ${this.datePostConvert()}</div>
                        <div class="age-post">${this.agePost()}</div>
                    </div>
                </div>
                `
    }
}

if (listTestimoni.length !== 0) {
    listTestimoni = listTestimoni.map((testimoni) => {
        return new Testimoni(
            testimoni.author,
            testimoni.message,
            testimoni.url,
            testimoni.date,
            testimoni.star,
        )
    })

    renderTestimoni()
}

function renderTestimoni() {
    containerTestimoni.innerHTML = " "
    listTestimoni.forEach((form) => {
        containerTestimoni.innerHTML += form.elementHtml()
    })
}

form.addEventListener("submit", (event) => {
    onSubmit(event)
})
async function onSubmit(event) {
    event.preventDefault()
    const inputName = document.querySelector("#name").value
    const inputDeskripsi = document.querySelector("#deskripsi").value
    const inputImage = document.querySelector("input[type='file']").files[0]
    const checkedStar = document.querySelector("input[name='star']:checked")?.value

    let alertMessage = ""
    if (inputName == "") alertMessage += `tolong isikan name terlebih dahulu \n`
    if (inputDeskripsi == " ") alertMessage += `tolong isikan deskripsi terlebih dahulu \n`
    if (inputImage == undefined) alertMessage += `tolong upload gambar terlebih dahulu \n`
    if (checkedStar == undefined) alertMessage += `tolong berikan rating terlebih dahulu`

    if (alertMessage.length !== 0) return alert(alertMessage)

    try {
        const imageURl = await convertUrl(inputImage)
        let ClassTestimoni = new Testimoni(
            inputName,
            inputDeskripsi,
            imageURl,
            new Date(),
            checkedStar,
        )
        listTestimoni.push(ClassTestimoni)
        localStorage.setItem("listTestimoni", JSON.stringify(listTestimoni))
        return renderTestimoni()
    } catch (error) {
        return false
    }
}

function convertUrl(url) {
    const ReaderUrl = new FileReader()
    ReaderUrl.readAsDataURL(url)

    return new Promise((resolve, reject) => {
        ReaderUrl.onerror = () => {
            reject(ReaderUrl.error)
        }

        ReaderUrl.onload = () => {
            resolve(ReaderUrl.result)
        }
    })
}
