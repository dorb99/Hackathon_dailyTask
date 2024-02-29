const Question = require("../schemas/questionsSchema");
const User = require("../schemas/userSchema");

exports.createUser = async (req, res) => {
  const { username, fullName } = req.body;
  if (!username || !fullName) return res.status(404).send("not enough data");
  try {
    const UserExists = await User.exists({ username });
    if (UserExists) {
      res.status(406).send("username already exists");
    } else {
      const newUser = await User.create({
        ...req.body,
      });
      if (!newUser) return res.status(405).send("couldnt create user");
      res.status(200).send("User deleted successfully");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllStudents = async (req, res) => {
  try {
    const allStudents = await User.find({ role: "student" });
    if (!allStudents) return res.status(405).send("no students found");
    res.status(200).send(allStudents);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.userLogin = async (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(404).send("didnt recived username");
  try {
    const signedUser = await User.findOne({
      username,
    });
    if (!signedUser) return res.status(405).send("couldnt login");
    res.status(200).send(signedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findUserByName = async (req, res) => {
  const fullName = req.body.fullName;
  try {
    const foundUser = await User.findOne({ fullName });
    if (!foundUser) return res.status(405).send("couldnt find user");
    res.status(200).send(foundUser);
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
    if (!updatedUser) return res.status(405).send("couldnt find user");
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAndDeleteUser = async (req, res) => {
  try {
    const replacedUser = await User.findOneAndDelete({
      username: req.body.username,
    });
    if (!replacedUser) return res.status(405).send("couldnt delete");
    res.status(200).send(" delete user");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addClass = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { $push: { classes: req.body.class } },
      { new: true }
    );
    if (!updatedUser) return res.status(405).send("couldnt find user");
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
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
    if (!updatedUser) return res.status(405).send("couldnt find user");
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
