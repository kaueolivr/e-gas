const pool = require("../models/index.js")

// Create a cylinder
const createCylinder = async (request, response) => {
    try {
        let cylinder = (await pool.query("INSERT INTO cylinders (name, created_at, updated_at) VALUES ($1, 'now', 'now') RETURNING id, name", [request.body.name])).rows[0]
        await pool.query("INSERT INTO users_cylinders (created_at, updated_at, user_id, cylinder_id) VALUES ('now', 'now', $1, $2) RETURNING user_id", [request.userId, cylinder.id])
        response.status(200).send(`Gas cylinder '${cylinder.name}', with id ${cylinder.id}, was created.`)
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }
}

// Send data from a cylinder
const registerData = async (request, response) => {
    try {
        let data = request.body
        if (data.type.toLowerCase() != "weight" && data.type.toLowerCase() != "pressure") {
            response.status(400).send("Register type invalid.")
            return
        }
        result = (await pool.query("INSERT INTO cylinders_records (date, device_id, type, value, cylinder_id) VALUES ('now', $1, $2, $3, $4) RETURNING cylinder_id", [data.deviceId, data.type.toLowerCase(), data.value, data.cylinderId])).rows[0]
        if (data.type.toLowerCase() == "weight") {
            await pool.query("UPDATE cylinders SET updated_at = 'now', weight_device_id = $1 WHERE id = $2", [data.deviceId, data.cylinderId])
        }
        else {
            await pool.query("UPDATE cylinders SET updated_at = 'now', pressure_device_id = $1 WHERE id = $2", [data.deviceId, data.cylinderId])
        }
        response.status(200).send(`ID ${result.cylinder_id} cylinder data sent.`)
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }
}

// Show the data of a cylinder
const cylinderDashboard = async (request, response) => {
    try {
        const cylinderId = request.body.cylinderId
        let cylinder = (await pool.query("SELECT * FROM cylinders WHERE id = $1", [cylinderId])).rows[0]
        let records = (await pool.query("SELECT * FROM cylinders_records WHERE cylinder_id = $1", [cylinderId])).rows
        response.send({ cylinder: cylinder, records: records})
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }
}

// Change the name of a cylinder
const updateCylinderName = async (request, response) => {
    try {
        let cylinderName = (await pool.query("UPDATE cylinders SET name = $1, updated_at = 'now' WHERE id = $2 RETURNING name", [request.body.newCylinderName, request.body.cylinderId])).rows[0].name
        response.status(200).send(`Cylinder name updated to ${cylinderName}.`)
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }
}

// Delete a cylinder
const deleteCylinder = async (request, response) => {
    try {
        await pool.query("DELETE FROM cylinders WHERE id = $1", [request.body.cylinderId])
        response.status(200).send("Cylinder deleted.")
    }
    catch (error) {
        response.status(500).send("An error has occurred.")
        throw error
    }
}

module.exports = {
    createCylinder: createCylinder,
    registerData: registerData,
    cylinderDashboard: cylinderDashboard,
    updateCylinderName: updateCylinderName,
    deleteCylinder: deleteCylinder
}