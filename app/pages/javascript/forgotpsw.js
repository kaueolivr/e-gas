let forgot_psw = document.querySelector('#forgot_form')
let email = document.querySelector('#email')




form.addEventListener("submit", function(event) {
    event.preventDefault()

    let data = {
        email: email.value,
    }

    fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
})