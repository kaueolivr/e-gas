const controller = require("../controllers/auth.controller")

module.exports = function (app) {
    app.use(function (request, response, next) {
        // HTTP request checked by CORS middleware (allow x-access-token header)
        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })
    app.post("/api/auth/signin", controller.signIn)
}