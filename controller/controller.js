const { response, request , next } = require('express');
const express = require('express');
//const router = express.Router();
const signUpTemplate = require('../models/SignUpModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





            // Show data
                
    const index = (req,res,next) => {
        signUpTemplate.find()
        .then(response => {
            res.json({
                response
            })

        }).catch (error => {
                res.json({
                    message : 'Error occur while showing all data !!'
                 } )
        })  

    } 
                // only one data
    const show = (req,res,next) => {
        let email = req.body.email
        signUpTemplate.find({ email : email})
        .then(response => {
            res.json({
                response
            })

        }).catch (error => {
                // res.json({
                //     message : 'Error occur while show single data!!'
                //  } )
                console.log(error)
        })  

    }


    const topscore = (req,res,next) => {
        signUpTemplate.find().sort({"score" : -1}).limit(3)
        .then(response => {
            res.json({
                response
            })

        }).catch (error => {
                // res.json({
                //     message : 'Error occur while show single data!!'
                //  } )
                console.log(error)
        })  

    }
    
    // save data

    const signup = async (req,res,next) => {
    
        const saltPassword =  await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, saltPassword);
        let userChk = 0;
    
        const signUpUser = new signUpTemplate({
            userName :  req.body.userName,
            email :  req.body.email,
            password :  securePassword,
            score : req.body.score,
            like : req.body.like,
            stage : req.body.stage,
        })
        let email =  req.body.email
        await signUpTemplate.findOne({ email : email})
        .then(response => {
            res.json({
                message : "User already exist"
            })})
        signUpUser.save().then(data => {
            console.log(data);
                res.json({
                    message : 'SignUp'
                })
        }).catch(error => { 
            response.json({
                message : 'Error occure while sign up'
            })
        })
        }
    
//update data
    const score = async (req,res,next) => {

        let email = req.body.email;
        let score = req.body.score;
        await    signUpTemplate.findOneAndUpdate({email}, { $set: {score}} )
            .then(data => {
            console.log(data);
                response.json(data)
        }).catch((err) => { 
            // 
            console.log(err)
        })
    
    }


    const update = async (req,res,next) => {

        let email = req.body.email;
         const saltPassword =  await bcrypt.genSalt(10);
         const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    
        let updateData = {
            userName :  req.body.userName,
            email,
            password :  securePassword
            
        }
            signUpTemplate.findOneAndUpdate(email, { $set: updateData} )
            .then(data => {
            console.log(data);
                response.json(data)
        }).catch((err) => { 
            // 
            console.log(err)
        })
    
    }

  // Delete any data
  
  const destroy = (req,res,next) => {
    let email = req.body.email
    signUpTemplate.findOneAndRemove({email:email})
    .then(response => {
        res.json({
            response
        })

    }).catch (error => {
            res.json({
                message : 'Error occur while deleting!!'
             } )
    })  

}
// user login
const login = (req,res,next) => {

            email = req.body.email;
            password = req.body.password;
    
            signUpTemplate.findOne({email:email})
            .then(user => {
                    if(user){
                        bcrypt.compare(password,user.password, function(err,result)
                        {
                            if(err) {
                                res.json({
                                    error :err
                                })
                            }
                            if(result){
                                let token = jwt.sign({name:user.userName},'2582)(2852',{expiresIn : '1h'})
                                res.json({
                                    message : "Login",
                                    token
                                })
                            }else{
                                res.json({
                                    message : "Password doesnt match"
                                })
                            }
                        })
                    }else{
                        res.json({
                            message : "User not found"
                        })
                    }
    
            })
    
    
    }


module.exports = { index, show, signup, update, destroy, login, score, topscore}



