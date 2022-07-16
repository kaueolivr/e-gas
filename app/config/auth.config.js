// Require dotenv to read .env file
require("dotenv/config");

// Configurations to create JWT
module.exports = {
    secret: process.env.SECRET_JWT
}