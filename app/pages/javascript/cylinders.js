let user_data = JSON.parse(sessionStorage.getItem("memory"));
let cylinders = user_data.cylinders
let btn_div = document.querySelector('#btn_div')

let create_modal = document.querySelector("#cylinderCreateModal");
let form = document.querySelector("#cylinderForm")
let cylinderName = document.querySelector("#cylinderName")

const token_header = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': sessionStorage.getItem("accessToken")
})


window.onclick = function(event) {
    if (event.target == create_modal) {
      create_modal.style.display = "none";
      form.reset()
    }
  }
  
  function cancelbtn(){
      create_modal.style.display='none'
      form.reset()
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

    const answer = await response.text()
    if (answer.includes('created') == true){
        alert('Seu botijão foi criado com sucesso')

        let new_data = {
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('psw')
        }

        const new_response = await fetch("https://e-gas.onrender.com/api/auth/signin", {
            method: "POST",
            headers: token_header,
            body: JSON.stringify(new_data)
        })

        const new_answer = await new_response.json()
        if(new_answer.authenticated == true){
            sessionStorage.removeItem('psw')
            sessionStorage.setItem("memory", JSON.stringify(new_answer))
            location.reload()
        }
    }
    else{
        alert('Erro ao criar o botijão')
    }
})

function create_btn(value, index){
    console.log(value)
    let btn = document.createElement('button')
    let btn_txt = document.createTextNode(`${value}`)

    btn.addEventListener("click", function () {
        sessionStorage.setItem("cylinder_id", (index + 1))
        window.location.replace("index.html")
    })
    btn.appendChild(btn_txt)
    btn_div.appendChild(btn)
}

cylinders.forEach(create_btn)





