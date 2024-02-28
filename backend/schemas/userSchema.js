

const mongoose = require('mongoose')
const newUser = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        fullName:{
            type:String,
            required:true
        },
        classes:{
            type:[String]
        },
        role:{
            type:String, 
            required:true
        },
        questions:{
            type:[Object]
        }
    }
)

const User = mongoose.model('User', newUser)
module.exports = User

