const controller = require("../controllers/auth.controller")
const { verifySignUp } = require("../middleware")

module.exports = function (app) {
    app.use(function (request, response, next) {
        // HTTP request checked by CORS middleware (allow x-access-token header)
        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })
    app.post("/api/user/signup", [verifySignUp.checkDuplicateUsernameOrEmail], controller.signUp) // Check duplicate username or email to create an user
    app.post("/api/auth/signin", controller.signIn)
    app.post("/api/auth/forgotpassword", controller.forgotPassword)
    app.get("/api/auth/resetpassword/:id/:token", controller.loadResetPasswordForm)
    app.post("/api/auth/resetpassword/:id/:token", controller.resetPassword)
}