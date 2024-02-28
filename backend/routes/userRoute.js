

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route("/create")
.post(userController.createUser)
// router.route("/findAllUsers")
// .get(userController.findAllUsers);
router.route("/login")
.post(userController.userLogin)
// router.route("/deleteUser")
// .delete(userController.findAndDeleteUser)
// router.route("/updateUser")
// .patch(userController.findAndUpdateUser)
// router.route("/findUserByName")
// .get(userController.findUserByName)
router.route("/addClass")
.patch(userController.addClass)
router.route("/addQuestion")
.patch(userController.addQuestion)

module.exports = router;