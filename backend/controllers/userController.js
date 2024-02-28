

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

    } catch (error) {
        
    }
}