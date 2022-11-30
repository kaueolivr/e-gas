window.addEventListener("load", function () {
    if (sessionStorage.getItem("accessToken") == null) {
        window.location.href = window.location.origin+"/login.html"
    }
})

let cylinder_id = sessionStorage.getItem("cylinder_id")

const token_header = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': sessionStorage.getItem("accessToken")
})

async function charts(){
    const response = await fetch(`https://e-gas.onrender.com/api/cylinder/${cylinder_id}`, {
        method: "GET",
        headers: token_header
    })
    
    
    const anwser = await response.json()
    let weight_data = []
    let pressure_data = []

    anwser.records.forEach(function(value){
        if (value.type == "weight") {
            weight_data.push(value)
        }
        else {
            pressure_data.push(value)
        }
    })

    const len_weight = weight_data.length
    const len_pressure = pressure_data.length

    console.log(weight_data)
    console.log(pressure_data)

    let weightchart_data = []

    weight_data.forEach(function(value){
        let time = new Date((value.date))
        let n_value = Number(value.value)
        let data_obj = {
            x: `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            y: n_value
        }
        weightchart_data.push(data_obj)
    })
    
    console.log(weightchart_data)



    const data = {
            datasets: [{
                label:'Weight',
                data: weightchart_data
            }]
    }
    const config = {
        type: 'line',
        data,
        options:{
            scales:{
                x:{
                    type: 'time',
                    time:{
                        format: "HH:MM:SS",
                    }
                },
                y:{
                    beginAtZero: true
                }
            }
        }
    
    }

    const myChart = new Chart(document.getElementById('weight_chart'), config)
    

}

charts()