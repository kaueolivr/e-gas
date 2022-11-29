let user_data = JSON.parse(sessionStorage.getItem("memory"));
let cylinders = user_data.cylinders
let btn_div = document.querySelector('#btn_div')


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


