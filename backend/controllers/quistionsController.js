const Question = require("../schemas/questionsSchema");

exports.createQuestion = async (req, res) => {
  const { question, answers, correctAnswer, roomId } = req.body;
  if (!question || !answers || !correctAnswer || !roomId)
    return res.status(404).send("question inccorrect");
  try {
    const newQuestion = await Question.create({
      question,
      answers,
      correctAnswer,
      roomId,
    });
    if (!newQuestion) return res.status(404).send("question inccorrect");
    else res.status(200).send("question created successfully");
  } catch (error) {
    res.send(error);
  }
};

exports.findAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find({});
    res.send(allQuestions);
  } catch (error) {
    res.send(error);
  }
};
exports.findQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const question = await Question.findById({ id });
    res.status(200).send(question);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAndUpdateQuestion = async (req, res) => {
  try {
    const updatedQustion = await Question.findOneAndUpdate(
      { qustion: req.body.question },
      req.body,
      { new: true }
    );
    res.send(updatedQustion);
  } catch (error) {
    res.send(error);
  }
};

exports.findAndDeleteQuestion = async (req, res) => {
  try {
    const replacedQuestion = await Question.findOneAndDelete({
      question: req.body.question,
    });
    res.send(replacedQuestion);
  } catch (error) {
    res.send(error);
  }
};
