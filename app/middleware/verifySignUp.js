// Import the pool configurated in app/models/index.js
const pool = require("../models")

// Check if username is duplicated or not
const checkDuplicateUsernameOrEmail = async (request, response, next) => {
    try {
        // Check duplicate username
        let resultUsername = await pool.query("SELECT * FROM users WHERE username = $1", [request.body.username])
        if (resultUsername.rowCount != 0) {
            response.status(400).send({ message: "Failed! Username is already in use!" })
            return
        }

        // Check duplicate email
        let resultEmail = await pool.query("SELECT * FROM users WHERE email = $1", [request.body.email])
        if (resultEmail.rowCount != 0) {
            response.status(400).send({ message: "Failed! Email is already in use!" })
            return
        }
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        console.log(error)
    }

    next()
}

// Export the results of the middleware
module.exports = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
}