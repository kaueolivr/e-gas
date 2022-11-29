window.addEventListener("load", function () {
    if (sessionStorage.getItem("accessToken") == null) {
        window.location.href = window.location.origin+"/login.html"
    }
})

const ctx = document.getElementById('myChart').getContext('2d');

var ChartDaily = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["01h","02h", "03h", "04h", "05", "06h", "07h", "08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h'],
        datasets: [{
            label: "CONSUMO DE GÁS DIÁRIO",
            data: [5,20,10,5,4,3,8,9,17,6,15,14,3,16,19,27,28],
            borderWidth: 6,
            borderColor: 'rgba(80,64,153,0.8)',
            backgroundColor: 'transparent',
        }]

    }
})