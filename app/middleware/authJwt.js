const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const pool = require("../models/index.js")

// Verify the token authenticity
const verifyToken = (request, response, next) => {
    // Token is in x-access-token reader
    let token = request.headers["x-access-token"]
    // Check if token is provided
    if (!token) {
        response.status(403).send("No token provided!")
        return
    }

    // Check if token is legal
    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            response.status(401).send("Unauthorized!")
            return
        }
        // Set user id, decripted from jwt, as a property of the request, if the user exists
        result = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.id])
        if (result.rowCount == 0) {
            response.status(401).send("The user used for authentication does not exist.")
            return
        }
        request.userId = decoded.id
        next()
    })
}

// Check if the user has access to register data of a cylinder
const hasAccess = async (request, response, next) => {
    try {
        // Check in user-cylinder relation at the users_cylinders table
        result = (await pool.query("SELECT * FROM users_cylinders WHERE user_id = $1 AND cylinder_id = $2", [request.userId, request.body.cylinderId])).rowCount
        if (result == 0) {
            response.status(403).send("You do not have access to this cylinder.")
            return
        }
        next()
    }
    catch (error) {
        console.log(error)
    }
}

// Export the results of the middleware
module.exports = {
    verifyToken: verifyToken,
    hasAccess: hasAccess
}