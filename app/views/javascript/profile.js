let user = document.querySelector('#name')
let email = document.querySelector('#email')
let created = document.querySelector('#created')

let create_modal = document.querySelector("#cylinderCreateModal");
let form = document.querySelector("#cylinderForm")
let cylinderName = document.querySelector("#cylinderName")

window.addEventListener("load", function () {
    if (sessionStorage.getItem("accessToken") == null) {
        window.location.href = window.location.origin+"/login.html"
    }
})

const token_header = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': sessionStorage.getItem("accessToken")
})

window.onclick = function(event) {
  if (event.target == create_modal) {
    create_modal.style.display = "none";
    create_modal.reset()

  }
}

function cancelbtn(){
    create_modal.style.display='none'
    create_modal.reset()
}

function user_data(){
    let created_data = new Date(sessionStorage.getItem("created"))
 
     user.innerHTML = sessionStorage.getItem("username")
     email.innerHTML = sessionStorage.getItem("email")
     created.innerHTML = created_data
}

form.addEventListener("submit", async function(event) {
    event.preventDefault()

    let data = { 
        name: cylinderName.value 
    }
    const response = await fetch("https://e-gas.onrender.com/api/cylinder/create", {
        method: "POST",
        headers: token_header,
        body: JSON.stringify(data)
    })

    const answer = await response.json()
    console.log(answer)
})


user_data()