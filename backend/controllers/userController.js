const Question = require("../schemas/questionsSchema");
const User = require("../schemas/userSchema");



exports.createUser = async (req, res) => {
  try {
    const UserExists = await User.exists({ fullName: req.body.fullName });
    if (UserExists) {
      res.status(402).send("user already exists");
    } else {
      const newUser = await User.create({
        ...req.body,
      });
      res.send(newUser);
    }
  } catch (error) {
    res.status("fail").send("couldn't create user");
  }
};

exports.findAllStudents = async (req, res) => {
  try {
    const allStudents = await User.find({ role: 'student' });
    res.send(allStudents);
  } catch (error) {
    res.send(error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const signedUser = await User.findOne({
      username,
    }).exec();
    if (signedUser) return res.status(200).send(signedUser);
    else res.status(403).send(`username doesnt exist ${username}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findUserByName = async (req, res) => {
  try {
    const foundUser = await User.findOne({
      fullName: req.body.fullName,
    }).exec();
    res.send(foundUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAndUpdateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },
      req.body,
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

exports.findAndDeleteUser = async (req, res) => {
  try {
    const replacedUser = await User.findOneAndDelete({
      username: req.body.username,
    });
    res.send(replacedUser);
  } catch (error) {
    res.send(error);
  }
};

exports.addClass = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { $push: { classes: req.body.class } },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

exports.answerQuestion = async (req, res) => {
  const { userId, questionId, answer } = req.body;
  if (!userId || !questionId || !answer)
    return res.status(404).send("invalid data");
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          questions: {
            id: questionId,
            answerQuestion: answer,
          },
        },
      },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};
