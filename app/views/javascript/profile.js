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

function logoff(){
    sessionStorage.clear()
    window.location.href = window.location.origin+"/login.html"
}

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

user_data()