const { authJwt } = require("../middleware")
const controller =  require("../controllers/cylinder.controller")

module.exports = function (app) {
    app.use(function(request, response, next) {
        response.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    // Verify the token authenticity before create a cylinder
    app.post("/api/cylinder/create", [authJwt.verifyToken], controller.createCylinder)

    // Verify the token authenticity and check if the user has access (authorization)
    app.post("/api/cylinder/register/:id", [authJwt.verifyToken, authJwt.hasAccess], controller.registerData)
    app.get("/api/cylinder/:id", [authJwt.verifyToken, authJwt.hasAccess], controller.cylinderDashboard)
    app.put("/api/cylinder/update/:id", [authJwt.verifyToken, authJwt.hasAccess], controller.updateCylinderName)
    app.delete("/api/cylinder/delete/:id", [authJwt.verifyToken, authJwt.hasAccess], controller.deleteCylinder)
}