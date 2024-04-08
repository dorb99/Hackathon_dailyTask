

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route("/create")
.post(userController.createUser)
router.route("/findAllStudents")
.get(userController.findAllStudents);
router.route("/login")
.post(userController.userLogin)
router.route("/addClass")
.patch(userController.addClass)
router.route("/answerQuestion")
.patch(userController.answerQuestion)
router.route("/findAllQuestions/:id")
.get(userController.findAllQuestions)

module.exports = router;