

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.route("/create")
.post(questionController.createQuestion)
router.route("/findAllQuestions")
.get(questionController.findAllQuestions);
router.route("/findQuestion/id/:id")
.get(questionController.findQuestionById);
router.route("/findQuestion/:question")
.get(questionController.findQuestion);
router.route("/deleteQuestion")
.delete(questionController.findAndDeleteQuestion)



module.exports = router;