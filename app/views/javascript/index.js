let indication = document.querySelector(".indication")
let welcome = document.querySelector("#gas_welcome")
let duration = document.querySelector("#gas_duration")
let pressure = document.querySelector("#pressure_indication")
let auto_gasind = document.querySelector(".auto_gas")
let cylinder_id = sessionStorage.getItem("cylinder_id")
let user = sessionStorage.getItem("username")

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

function source_element(x,y,z){
    x.media = `(max-width:${y}px)`
    x.srcset = z
    x.type = "image/png"
    x.classList.add("auto_gas")
}

function img_element(x,y){
    x.src = y
    x.alt = "indicador botijão"
    x.classList.add("auto_gas")
}

async function gas_indication(){
    const response = await fetch(`https://e-gas.onrender.com/api/cylinder/${cylinder_id}`, {
        method: "GET",
        headers: token_header
    })
    
    
    const data = await response.json()
    let weight_data = []
    let pressure_data = []

    data.records.forEach(function(value){
        if (value.type == "weight") {
            weight_data.push(value)
        }
        else {
            pressure_data.push(value)
        }
    })

    const len_weight = weight_data.length
    const len_pressure = pressure_data.length
    

    // set indication text
    indication.innerHTML = `Você ainda possui ${weight_data[len_weight - 1].value} kg de gás`
    pressure.innerHTML = `Indicador de pressão: ${pressure_data[len_pressure - 1].value} kPa`

    //set image indication
    if (weight_data[len_weight - 1].value == 13){
        console.log(1)
        const source_645px = document.getElementById('645px')
        const source_1300px = document.getElementById('1300px')
        const img_100 = document.querySelector("#img")

        img_element(img_100,"images/fullgas_500px.png")
        source_element(source_645px, 645, "images/fullgas_100px.png")
        source_element(source_1300px, 1300,"images/fullgas_250px.png")
    }
    else if (weight_data[len_weight - 1].value <= 12.99 && weight_data[len_weight - 1].value >= 9.75 ){
        console.log(2)
        const source_645px = document.getElementById('645px')
        const source_1300px = document.getElementById('1300px')
        const img_75 = document.querySelector("#img")

        img_element(img_75,"images/75gas_500px.png")
        source_element(source_645px, 645, "images/75gas_100px.png")
        source_element(source_1300px, 1300,"images/75gas_250px.png")

    }
    else if (weight_data[len_weight - 1].value < 9.75 && weight_data[len_weight - 1].value >= 6.5 ){
        console.log(3)
        const source_645px = document.getElementById('645px')
        const source_1300px = document.getElementById('1300px')
        const img_50 = document.querySelector("#img")

        img_element(img_50,"images/50gas_500px.png")
        source_element(source_645px, 645, "images/50gas_100px.png")
        source_element(source_1300px, 1300,"images/50gas_250px.png")

    }
    else if (weight_data[len_weight - 1].value < 6.5 && weight_data[len_weight - 1].value > 0){
        console.log(4)
        const source_645px = document.getElementById('645px')
        const source_1300px = document.getElementById('1300px')
        const img_25 = document.querySelector("#img")

        img_element(img_25,"images/25gas_500px.png")
        source_element(source_645px, 645, "images/25gas_100px.png")
        source_element(source_1300px, 1300,"images/25gas_250px.png")
    }
    else if (weight_data[len_weight - 1].value == 0){
        console.log(5)
        const source_645px = document.getElementById('645px')
        const source_1300px = document.getElementById('1300px')
        const img_00 = document.querySelector("#img")

        img_element(img_00,"images/0gas_500px.png")
        source_element(source_645px, 645, "images/0gas_100px.png")
        source_element(source_1300px, 1300,"images/0gas_250px.png")
    }
}

async function username(){
    welcome.innerHTML = `Olá ${user}, <small id="lower">bem vindo ao E-gás</small>`
}

username()
.catch(error =>{
    console.log(error)
})

setInterval(gas_indication, 1000)




