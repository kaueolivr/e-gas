const { authJwt } = require("../middleware")
const controller =  require("../controllers/user.controller")

module.exports = function (app) {
    app.use(function(request, response, next) {
        response.header ("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept")
        next()
    })
    
    // Verify the token authenticity before update or delete an user
    app.put("/api/user/update", [authJwt.verifyToken], controller.updateUsernameOrEmailOrPassword)
    app.delete("/api/user/delete", [authJwt.verifyToken], controller.deleteUser)
}