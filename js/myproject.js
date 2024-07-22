let dataElement = []

function addProject(event) {
    event.preventDefault()
    const listCard = document.querySelector(".list-card")

    const nameProject = document.querySelector("#project").value
    const startDate = document.querySelector("#start-date").value
    const endDate = document.querySelector("#end-date").value
    const description = document.querySelector("#description").value
    const imageProject = document.querySelector("#image-project").files[0]

    let dataForm = {
        nameProject,
        startDate,
        endDate,
        description,
        imageProject,
    }

    dataElement.push(dataForm)
    listCard.innerHTML = ""

    dataElement.forEach((data, index) => {
        console.log(data)
        listCard.innerHTML += `
        <div class="container-card-project">
                <div class="card-project">
                    <div class="card-image">
                        <img src="./assets/images.jpeg" alt="gambar dummy" />
                    </div>
                    <div class="header-card">
                        <h4>${data.nameProject}</h4>
                        <p>durasi 3 bulan</p>
                    </div>
                    <div class="body-card">
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint fugit
                            beatae est magni dolores eveniet ullam reprehenderit recusandae
                            provident! Accusantium ratione error atque, praesentium temporibus
                            aliquid harum aut magni deleniti!
                        </p>
                    </div>
                    <div class="icon-teknologi">
                        <img
                            src="https://img.icons8.com/?size=100&id=99407&format=png&color=000000"
                            alt="playstore" />
                        <img
                            src="https://img.icons8.com/?size=100&id=99273&format=png&color=000000"
                            alt="android" />
                        <img
                            src="https://img.icons8.com/?size=100&id=2572&format=png&color=000000"
                            alt="java" />
                    </div>
                    <div class="navigasi-card">
                        <button type="button" list=${index}>edit</button>
                        <button type="button" list=${index}>delete</button>
                    </div>
                </div>
            </div>
    `
    })
}

const submitInput = document.querySelector("#submit-project")

submitInput.addEventListener("click", (event) => {
    addProject(event)
})
