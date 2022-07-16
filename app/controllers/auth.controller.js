const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const pool = require("../models/index.js")

// Make a sign in request
const signIn = async (request, response) => {
    try {
        let result = (await pool.query("SELECT * FROM users WHERE username = $1", [request.body.username]))

        // User does not exist
        if (result.rowCount == 0) {
            response.status(404).send({ message: "User not found." })
            return
        }

        let user = result.rows[0]

        // Check if the password is correct using bcrypt
        let passwordIsValid = bcrypt.compareSync(request.body.password, user.password)
        if (!passwordIsValid) {
            response.status(401).json({ accessToken: null, message: "Invalid password!" })
            return
        }

        // Create a token using user id, secret and expiration time
        let token = jwt.sign({ id: user.id }, config.secret)

        // Check the cylinders that the user has access to
        let authorities = []
        let cylinders = await pool.query("SELECT * FROM users_cylinders WHERE user_id = $1", [user.id])
        for (let i = 0; i < cylinders.rowCount; i++) {
            authorities.push("CYLINDER_" + cylinders.rows[i].cylinder_id)
        }

        response.status(200).json({ id: user.id, username: user.username, email: user.email, cylinders: authorities, accessToken: token })
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }
}

module.exports = {
    signIn: signIn
}