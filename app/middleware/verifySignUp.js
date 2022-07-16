// Import the pool configurated in app/models/index.js
const pool = require("../models")

// Check if username is duplicated or not
const checkDuplicateUsername = async (request, response, next) => {
    try {
        // Check duplicate username
        var resultUsername = await pool.query("SELECT * FROM users WHERE username = $1", [request.body.username])
        if (resultUsername.rowCount != 0) {
            response.status(400).send({ message: "Failed! Username is already in use!" })
            return
        }
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }

    next()
}

// Export the results of the middleware
module.exports = {
    checkDuplicateUsername: checkDuplicateUsername
}