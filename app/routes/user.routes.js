const { authJwt } = require("../middleware")
const { verifySignUp } = require("../middleware")
const controller =  require("../controllers/user.controller")

module.exports = function (app) {
    app.use(function(request, response, next) {
        response.header ("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    // Check duplicate username or email to create an user
    app.post("/api/user/signup", [verifySignUp.checkDuplicateUsername], controller.signUp)
    
    // Verify the token authenticity before update or delete an user
    app.put("/api/user/update", [authJwt.verifyToken], controller.updateUsernameOrPassword)
    app.delete("/api/user/delete", [authJwt.verifyToken], controller.deleteUser)
}