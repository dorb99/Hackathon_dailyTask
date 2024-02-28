

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/quistionsController');

router.route("/create")
.post(questionController.createQuestion)
router.route("/findAllQuestions")
.get(questionController.findAllQuestions);
router.route("/deleteQuestion")
.delete(questionController.findAndDeleteQuestion)
router.route("/updateQuestion")
.patch(questionController.findAndUpdateQuestion)


module.exports = router;