

const mongoose = require('mongoose')
const newQuestion = new mongoose.Schema(
    {
       question:{
        type:String,
        required:true
       },
       answers:{
        type:[String],
        required:true
       },
       correctAnswer:{
        type:String,
        required:true
       }
    }
)

const Question = mongoose.model('Question', newQuestion)
module.exports = Question

