function sendEmail(event, openWith) {
    event.preventDefault()

    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const phone = document.querySelector("#phone").value
    const subject = document.querySelector("#subject").value
    const message = document.querySelector("#message").value
    const validasiNomor = /(62|08)[1-9][0-9]{9}$/.test(phone)

    let alertMessage = ""
    if (name.length == 0) alertMessage += `name tidak boleh kosong \n`
    if (email.length == 0) alertMessage += `email tidak boleh kosong \n`
    if (phone.length == 0) alertMessage += `nomor handphone tidak boleh kosong \n`
    if (subject.length == 0) alertMessage += `subject tidak boleh kosong \n`
    if (message.length == 0) alertMessage += `message tidak boleh kosong \n`
    if (!validasiNomor) alertMessage += `nomor kamu tidak valid atau bukan nomor indonesia`

    if (alertMessage.length !== 0) {
        alert(alertMessage)
        return false
    }

    const receiverEmail = "mdavafahreza05@gmail.com"
    const bodyEmail = `hallo nama saya ${name} dan kontak saya adalah ${phone}, ${message}`
    const hrefMail = `mailto:${receiverEmail}?subject=${subject}&body=${bodyEmail}`
    const hrefGmail = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${receiverEmail}&body=${bodyEmail}&su=${subject}`

    const elemenA = document.createElement("a")
    elemenA.href = openWith ? hrefMail : hrefGmail
    elemenA.target = openWith ? "" : "_blank"
    elemenA.click()

    return null
}

const submitMail = document.querySelector(".submit-mail")
const submitGmail = document.querySelector(".submit-gmail")

submitMail.addEventListener("click", (event) => {
    sendEmail(event, true)
})

submitGmail.addEventListener("click", (event) => {
    sendEmail(event, false)
})
