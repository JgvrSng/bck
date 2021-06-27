const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({

    userName : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    score : {
        type : Number,
        required : true,
    },

    like : {
        type : String,
        required : true,
    },
 
    stage : {
        type : Number,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
})




const signUpUser  = mongoose.model('UserDataBackend', signUpTemplate)

module.exports = signUpUser