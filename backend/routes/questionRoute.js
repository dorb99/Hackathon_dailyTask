

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.route("/create")
.post(questionController.createQuestion)
router.route("/findAllQuestions")
.get(questionController.findAllQuestions);
router.route("/findQuestion/:id")
.get(questionController.findQuestion);
router.route("/deleteQuestion")
.delete(questionController.findAndDeleteQuestion)
router.route("/updateQuestion")
.post(questionController.updateQuestion)



module.exports = router;