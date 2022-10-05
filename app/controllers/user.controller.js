const bcrypt = require("bcryptjs")
const pool = require("../models/index.js")

// Change username or password at users table
const updateUsernameOrEmailOrPassword = async (request, response) => {
    try {
        // Update username
        if (request.body.newUsername) {
            await pool.query("UPDATE users SET username = $1, updated_at = 'now' WHERE id = $2", [request.body.newUsername, request.userId])
            response.status(200).send(`Username changed.`)
        }
        // Update email
        else if (request.body.newEmail) {
            await pool.query("UPDATE users SET email = $1, updated_at = 'now' WHERE id = $2", [bcrypt.hashSync(request.body.newPassword, 8), request.userId])
            response.status(200).send("Email changed.")
        }
        // Update password
        else if (request.body.newPassword) {
            await pool.query("UPDATE users SET password = $1, updated_at = 'now' WHERE id = $2", [bcrypt.hashSync(request.body.newPassword, 8), request.userId])
            response.status(200).send("Password changed.")
        }
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        console.log(error)
    }
}

// Delete a user from the users table
const deleteUser = async (request, response) => {
    try {
        await pool.query("DELETE FROM users WHERE id = $1", [request.userId])
        response.status(200).send("User deleted.")
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        console.log(error)
    }
}

module.exports = {
    updateUsernameOrEmailOrPassword: updateUsernameOrEmailOrPassword,
    deleteUser: deleteUser
}