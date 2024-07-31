let dataForm = JSON.parse(localStorage.getItem("dataForm")) || []
const fileReader = new FileReader()

if (dataForm.length !== 0) setViewProject()

function addProject(event) {
    event.preventDefault()

    const nameProject = document.querySelector("#project").value
    const endDateTime = document.querySelector("#end-date").value
    const startDateTime = document.querySelector("#start-date").value
    const description = document.querySelector("#description").value
    const imageInput = document.querySelector("#image-project").files[0]
    const checkNode = document.querySelector("#node").checked
    const checkReact = document.querySelector("#react").checked
    const checkJavascript = document.querySelector("#javascript").checked
    const checkSocket = document.querySelector("#socket").checked

    let alertMessage = ""
    if (nameProject == "") alertMessage += `tolong isi nama project nya \n`
    if (startDateTime == "") alertMessage += `tolong isi start time project nya \n`
    if (endDateTime == "") alertMessage += `tolong isi end time project nya \n`
    if (description == "") alertMessage += `tolong isi description project nya \n`
    if (imageInput == undefined) alertMessage += `tolong unggah image project nya \n`

    if (alertMessage.length !== 0) return alert(alertMessage)

    const startDate = new Date(startDateTime)
    const endDate = new Date(endDateTime)
    const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24) / 30)

    fileReader.readAsDataURL(imageInput)
    fileReader.onload = () => {
        let imageProject = fileReader.result
        let form = {
            nameProject,
            startDateTime,
            endDateTime,
            duration,
            description,
            imageProject,
            checkNode,
            checkReact,
            checkJavascript,
            checkSocket,
            postAt: new Date(),
        }

        dataForm.push(form)
        localStorage.setItem("dataForm", JSON.stringify(dataForm))
        return setViewProject()
    }
}

document.body.addEventListener("click", (element) => {
    if (element.target.classList.contains("delete")) {
        const confirmDelete = confirm("apakah yakin ingin mengahpus project ini")
        const index = element.target.getAttribute("list")

        if (confirmDelete) return removeCard(index)
        else return false
    }
})

function removeCard(indexArr) {
    let newData = dataForm
    delete newData[indexArr]

    dataForm = []
    newData.forEach((element, index) => {
        dataForm.push(element)
    })

    localStorage.setItem("dataForm", JSON.stringify(dataForm))
    return setViewProject()
}

function setViewProject() {
    const listCard = document.querySelector(".list-card")
    listCard.innerHTML = ""

    dataForm.forEach((data, index) => {
        listCard.innerHTML += `
        <div class="container-card-project">
                <div class="card-project">
                    <div class="card-image">
                        <a href="./detail-project.html">
                            <img src="${
                                data.imageProject
                            }" alt="gambar dummy"  class="link-detail" list=${index} class="link-detail" list=${index}/>
                        </a>
                    </div>
                    <div class="header-card">
                        <a href="./detail-project.html" class="link-detail" list=${index}>
                            <h4 class="link-detail" list=${index}>${data.nameProject}</h4>
                            <p class="link-detail" list=${index}>duration ${
            data.duration
        }  month</p>
                        </a>
                    </div>
                    <div class="body-card">
                        <p>
                            ${data.description}
                        </p>
                    </div>
                    <div class="icon-teknologi">
                    ${
                        data.checkReact
                            ? `<img src="https://img.icons8.com/?size=100&id=58811&format=png&color=000000"
                        alt="icon-react" />`
                            : ""
                    }

                    ${
                        data.checkNode
                            ? `<img
                        src="https://img.icons8.com/?size=100&id=FQlr_bFSqEdG&format=png&color=000000"
                        alt="icon-node" />`
                            : ""
                    }

                    ${
                        data.checkJavascript
                            ? `<img
                        src="https://img.icons8.com/?size=100&id=39854&format=png&color=000000"
                        alt="icon-javascript" />`
                            : ""
                    }

                    ${
                        data.checkSocket
                            ? `<img src="https://socket.io/images/logo.svg" alt="icon-socket" />`
                            : ""
                    }
                    </div>
                    <div class="date-post">
                        <div>
                            <div class="post-at">${datePostConvert(data.postAt)}</div>
                            <div> ${calculateAgePost(data.postAt)} </div>
                        </div>
                    </div>
                    <div class="navigasi-card">
                        <button type="button" list=${index} class="edit">edit</button>
                        <button type="button" list=${index} class="delete">delete</button>
                    </div>
                </div>
            </div>
    `

        return true
    })
}

function datePostConvert(datePost) {
    const ClasssDate = new Date(datePost)

    const nameOfMonth = [
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

    return `${ClasssDate.getDay()} ${
        nameOfMonth[ClasssDate.getMonth()]
    } ${ClasssDate.getFullYear()}`
}

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

document.body.addEventListener("click", (element) => {
    if (element.target.classList.contains("link-detail")) {
        element.preventDefault()
        let index = element.target.getAttribute("list")
        let elemenA = document.createElement("a")
        elemenA.href = "./detail-project.html"
        localStorage.setItem("index", index)
        elemenA.click()
    }
})

const submitInput = document.querySelector("#submit-project")

submitInput.addEventListener("click", (event) => {
    return addProject(event)
})
