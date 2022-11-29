let forgot_psw = document.querySelector('#newpsw_form')
let psw = document.querySelector('#password')
let url = window.location.href
let id = Number(url.slice(27, url.lastIndexOf("/")))

forgot_psw.addEventListener("submit", function(event) {
    event.preventDefault()

    let data = {
        newPassword: psw.value,
    }

    fetch(window.location.origin+"/api/auth/resetpassword/"+id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
})