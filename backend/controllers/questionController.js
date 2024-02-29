const Question = require("../schemas/questionsSchema");
const Room = require("../schemas/roomSchema");

exports.createQuestion = async (req, res) => {
  const { question, answers, correctAnswer, roomId } = req.body;
  if (!question || !answers || !correctAnswer || !roomId)
    return res.status(404).send("not enough data");
  try {
    const infoRoom = await Room.findOne({ roomId: roomId });
    const newQuestion = await Question.create({
      question,
      answers,
      correctAnswer,
      roomId,
      students: infoRoom.students,
    });
    if (!newQuestion) return res.status(405).send("data incorrect");
    else res.status(200).send("question created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find({});
    res.status(200).send(allQuestions);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findQuestion = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("not enough data");
  try {
    const question = await Question.findById({ id });
    res.status(200).send(question);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAndDeleteQuestion = async (req, res) => {
  const question = req.body.question;
  if (!question) return res.status(404).send("not enough data");
  try {
    const replacedQuestion = await Question.findOneAndDelete({
      question,
    });
    if (!replacedQuestion) return res.status(405).send("question not found");
    res.status(200).send("deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
