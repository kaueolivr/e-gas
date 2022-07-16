// Import modules
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")

// Configure app, cors and port
const app = express()
const corsOptions = { origin: "http://localhost:8081" }
const port = process.env.port || 3000

// Relates cors and bodyParser with app 
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Import routes
require("./app/routes/auth.routes")(app)
require("./app/routes/cylinder.routes")(app)
require("./app/routes/user.routes")(app)

// Simple GET route
app.get("/", (request, response) => {
    response.json({ message: "Hello World." })
})

//' Set port (app is listening for requests)
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})