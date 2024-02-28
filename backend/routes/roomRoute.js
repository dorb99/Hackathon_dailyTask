const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.route("/create").post(roomController.createRoom);
router.route("/deleteRoom").delete(roomController.findAndDeleteRoom);
router.route("/getRoom").patch(roomController.getRoom);

module.exports = router;
