

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route("/create")
.post(userController.createUser)
router.route("/findAllStudents")
.get(userController.findAllStudents);
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
router.route("/answerQuestion")
.patch(userController.answerQuestion)

module.exports = router;