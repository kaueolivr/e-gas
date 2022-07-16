const bcrypt = require("bcryptjs")
const pool = require("../models/index.js")

// Create user (sign up) and insert it into table users
const signUp = async (request, response) => {
    try {
        await pool.query("INSERT INTO users (username, password, created_at, updated_at) VALUES ($1, $2, 'now', 'now') RETURNING id", [request.body.username, bcrypt.hashSync(request.body.password, 8)])
        response.status(200).send("Success! User was created.")
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }
}

// Change username or password at users table
const updateUsernameOrPassword = async (request, response) => {
    try {
        // Update username
        if (request.body.newUsername) {
            let username = (await pool.query("UPDATE users SET username = $1, updated_at = 'now' WHERE id = $2 RETURNING username", [request.body.newUsername, request.userId])).rows[0].username
            response.status(200).send(`Username changed to ${username}.`)
        }
        // Update password
        else if (request.body.newPassword) {
            await pool.query("UPDATE users SET password = $1, updated_at = 'now' WHERE id = $2 RETURNING password", [bcrypt.hashSync(request.body.newPassword, 8), request.userId])
            response.status(200).send("Password changed.")
        }
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
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
        throw error
    }
}

module.exports = {
    signUp: signUp,
    updateUsernameOrPassword: updateUsernameOrPassword,
    deleteUser: deleteUser
}