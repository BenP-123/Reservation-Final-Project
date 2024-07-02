//Router for reservation routes and operations

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reservation_id/status")
    .put(controller.changeStatus)
    .all(methodNotAllowed);

router 
    .route("/:reservation_id")
    .put(controller.update)
    .get(controller.read)
    .all(methodNotAllowed)


router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;