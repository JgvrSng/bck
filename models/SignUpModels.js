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
 
    date : {
        type : Date,
        default : Date.now
    }
})




const signUpUser  = mongoose.model('SignUpBackend', signUpTemplate)

module.exports = signUpUser