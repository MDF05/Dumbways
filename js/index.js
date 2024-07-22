function sendEmail(event) {
    event.preventDefault()

    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const phone = document.querySelector("#phone").value
    const subject = document.querySelector("#subject").value
    const message = document.querySelector("#message").value

    let alertMessage = ""
    if (name.length == 0) alertMessage = `name tidak boleh kosong \n`
    if (email.length == 0) alertMessage += `email tidak boleh kosong \n`
    if (phone.length == 0) alertMessage += `nomor handphone tidak boleh kosong \n`
    if (subject.length == 0) alertMessage += `subject tidak boleh kosong \n`
    if (message.length == 0) alertMessage += `message tidak boleh kosong \n`

    if (alertMessage.length !== 0) {
        alert(alertMessage)
        return false
    }

    receiverEmail = "mdavafahreza05@gmail.com"

    const elemenA = document.createElement("a")
    elemenA.href = `mailto:${receiverEmail}?subject=${subject}&body=hallo nama saya ${name} dan kontak saya adalah ${phone}, ${message}`
    elemenA.click()

    return null
}

const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    sendEmail(event)
})
