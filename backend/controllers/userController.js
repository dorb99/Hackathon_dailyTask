

const User = require("../schemas/userSchema")
exports.createUser = async (req, res) => {
    try {
      const UserExists = await User.exists({ fullName: req.body.fullName });
      if (UserExists) {
        res.send(UserExists);
      } else {
        const newUser = await User.create({
          ...req.body
        });
        res.send(newUser);
      }
    } catch (error) {
      res.send(error);
    }
  };

exports.findAllUsers= async (req, res)=> {
    
    try{
    const allUser = await User.find({});
    res.send(allUser);
    } catch(error){
    res.send(error)
    }
}

exports.userSignIn = async (req, res) => {

        try {
            const signedUser = await User.findOne({username: req.body.username }).exec();
            res.send(signedUser);
        } catch (error) {
            res.status(500).send(error);
        }
    };

exports.findUserByName = async(req, res)=>{
    try{
      const foundUser = await User.findOne({fullName: req.body.fullName}).exec();
      res.send(foundUser);
    } catch (error) {
        res.status(500).send(error)
    }
}

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
    const replacedUser = await User.findOneAndDelete({username: req.body.username})
    res.send(replacedUser);
  } catch (error) {
    res.send(error);
  }
};

exports.addClass = async (req, res) => {

  try{
      const updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { class: req.body.class } }, 
        { new: true } 
      );
      res.send(updatedUser);
  } catch (error) {
      res.send(error)
  }
}

exports.addQuestion = async (req, res) => {

  try{
      const updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { questions: { id: req.body.id,
          answerQuestion: req.body.correctAnswer} } }, 
        { new: true } 
      );
      res.send(updatedUser);
  } catch (error) {
      res.send(error)
  }
}

