

const Question = require("../schemas/questionsSchema")

exports.createQuestion = async (req, res) => {
    try {
const newQuestion = await Question.create({...req.body});
        res.send(newQuestion);
    } catch (error) {
      res.send(error);
    }
  };

exports.findAllQuestions= async (req, res)=> {
    
    try{
    const allQuestions = await Question.find({});
    res.send(allQuestions);
    } catch(error){
    res.send(error)
    }
}
exports.findQuestionsById= async (req, res)=> {
    
    try{
    const allQuestions = await Question.findById({});
    res.send(allQuestions);
    } catch(error){
    res.send(error)
    }
}

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
    const replacedQuestion = await Question.findOneAndDelete({question: req.body.question})
    res.send(replacedQuestion);
  } catch (error) {
    res.send(error);
  }
};