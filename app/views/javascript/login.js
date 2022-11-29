let username = document.querySelector("#username")
let password = document.querySelector("#password")
let form = document.querySelector("#loginForm")

let signup = document.querySelector("#signup")
let signupform = document.querySelector("#signupForm")
let user = document.querySelector("#user")
let email = document.querySelector("#email")
let new_psw = document.querySelector("#new_psw")
let repeat = document.querySelector("#psw-repeat")


window.onclick = function(event) {
  if (event.target == signup) {
    signup.style.display = "none";
    signupform.reset()
  }
}

function cancelbtn(){
  signup.style.display='none'
  signupform.reset()
}

function showPSW() {
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
}

function showPSW_signup(){
  if (new_psw.type === "password") {
    new_psw.type = "text";
  } else {
    new_psw.type = "password";
  }
}

form.addEventListener("submit", async function(event) {
    event.preventDefault()

    let data = {
        username: username.value,
        password: password.value
    }

    const response = await fetch("https://e-gas.onrender.com/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
  })
    const answer = await response.json()
    if(answer.authenticated == true){
      sessionStorage.setItem("accessToken", answer.accessToken)
      sessionStorage.setItem("username", answer.username)
      sessionStorage.setItem("email", answer.email)
      sessionStorage.setItem("created", answer.creationData)
      sessionStorage.setItem("memory", JSON.stringify(answer))
      window.location.replace("cylinders.html")
      console.log(answer)
    }
    else{
      alert('Usuário ou senha incorretos')
      location.reload()
    }

})

signupform.addEventListener("submit", async function(event) {
  event.preventDefault()

  if (new_psw.value != repeat.value){
    alert("As senhas precisam ser iguais")
  }
  else{
    let data = {
      username: user.value,
      email: email.value,
      password: new_psw.value
   }

  const response = await fetch("https://e-gas.onrender.com/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
   })

   const answer = await response.json()
   console.log(answer)
  }
})

