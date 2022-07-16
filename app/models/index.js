// Import config from app/config/db.confg.js
const config = require("../config/db.config.js")
const Pool = require("pg").Pool

// Configure the pool using config
const pool = new Pool(config)

module.exports = pool