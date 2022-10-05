const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const config = require("../config/auth.config.js")
const pool = require("../models/index.js")
require("dotenv/config")

// Create user (sign up) and insert it into table users
const signUp = async (request, response) => {
    try {
        await pool.query("INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, 'now', 'now') RETURNING id", [request.body.username, request.body.email, bcrypt.hashSync(request.body.password, 8)])
        response.status(200).send("Success! User was created.")
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        console.log(error)
    }
}

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

        // Create a token using user id, password, and secret
        let token = jwt.sign({ id: user.id, password: user.password }, config.secret)

        // Check the cylinders that the user has access to
        let userCylinders = []
        let cylinders = await pool.query("SELECT * FROM users_cylinders WHERE user_id = $1", [user.id])
        for (let i = 0; i < cylinders.rowCount; i++) {
            userCylinders.push("CYLINDER_" + cylinders.rows[i].cylinder_id)
        }

        let data = { id: user.id, username: user.username, email: user.email, cylinders: userCylinders, accessToken: token }
        response.status(200).json(data)
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        console.log(error)
    }
}

// Send email to reset password
const forgotPassword = async (request, response) => {
    try {
        // Get the email from request body
        let result = (await pool.query("SELECT * FROM users WHERE email = $1", [request.body.email]))

        // Account does not exist
        if (result.rowCount == 0) {
            response.status(404).send({ message: "Email not found." })
            return
        }

        let user = result.rows[0]

        // Create a single-use token using user old password and creation data
        let token = jwt.sign({ id: user.id, email: user.email }, user.password + "-" + user.created_at)

        // Link to reset password (include the user id and token)
        let link = request.protocol + "://" + request.get("host") + "/api/auth/resetpassword/" + user.id + "/" + token

        // Send email
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset Password",
            text: "Hello " + user.username + ", the link to reset your password is " + link +"."
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                response.status(500).send("An error has occurred.")
                console.log(error)
            }
            else {
                response.status(200).json("Email sent.")
                // console.log("Email sent: " + info.response)
            }
        })

    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        console.log(error)
    }
}

const loadResetPasswordForm = async (request, response) => {
    // Load form page
}

// Reset password after email link is opened
const resetPassword = async (request, response) => {
    try {
        await pool.query("UPDATE users SET password = $1, updated_at = 'now' WHERE id = $2", [bcrypt.hashSync(request.body.newPassword, 8), request.params.id])
        response.status(200).send("Password changed.")
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        console.log(error)
    } 
}

module.exports = {
    signUp: signUp,
    signIn: signIn,
    forgotPassword: forgotPassword,
    loadResetPasswordForm: loadResetPasswordForm,
    resetPassword: resetPassword
}