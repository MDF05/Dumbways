const dataForm = JSON.parse(localStorage.getItem("dataForm"))
const detailProject = dataForm[Number(localStorage.getItem("index"))]

const descriptionElement = document.querySelector(".description-project")
const imageElement = document.querySelector(".image-project")
const durationElement = document.querySelector(".duration-project")
const nameElement = document.querySelector(".name-project")
const startDateElement = document.querySelector(".start-date")
const endDateElement = document.querySelector(".end-date")
const listTech = document.querySelector(".icon-teknologi")

imageElement.src = detailProject.imageProject
startDateElement.innerHTML = detailProject.startDateTime
endDateElement.innerHTML = detailProject.endDateTime
descriptionElement.innerHTML = detailProject.description
durationElement.innerHTML = detailProject.duration

const templateIcon = `
    ${
        detailProject.checkReact
            ? `<span>
        <img
        src="https://img.icons8.com/?size=100&id=58811&format=png&color=000000"
            alt="icon-react" />
        <span>React Js</span>
    </span>`
            : ""
    }
    ${
        detailProject.checkNode
            ? `<span>
        <img
        src="https://img.icons8.com/?size=100&id=FQlr_bFSqEdG&formatcolor=000000"
        alt="icon-node" />
        <span>Node Js</span>`
            : ""
    }
    </span>
    ${
        detailProject.checkJavascript
            ? `   <span>
        <img
        src="https://img.icons8.com/?size=100&id=39854&format=png&color=000000"
        alt="icon-node" />
        <span>Javascript</span>`
            : ""
    }
    </span>
    ${
        detailProject.checkSocket
            ? `<span>
        <img src="https://socket.io/images/logo.svg" alt="icon-node" />
        <span>Socket.IO</span>
    </span>`
            : ""
    }
    `

listTech.innerHTML = templateIcon
