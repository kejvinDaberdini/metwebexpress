const dao = require('../models/user-dao.js');
const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator')


router.get('/register', function(req,res,next){
  let logged = req.isAuthenticated();  
  res.render('register', {title: 'Registration page', logged:logged,message:req.flash('message')});
});


router.post('/register',[ 
  body('email').isEmail(),
  body('password').isLength({min: 6}),
  body('username').isLength({min: 1, max: 20}).isAlphanumeric(),
  ], function(req, res, next){
          
    const errors = validationResult(req);
   

    if(!errors.isEmpty()){
      
      req.flash('message', "validation error");
      res.redirect('back');
    }
    else{
      let logged = req.isAuthenticated(); 
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      const creator = (req.body.creator=='on')? 1:0;
      const newUser = {
          username: username,
          email: email,
          password: password,
          creator : creator
      };
      dao.createUser(newUser).then (err =>{
        if(err){
          req.flash('message','errorre validation');
          res.redirect('/login');
        }else{
          res.render('register', {'message':'wrong data , try again',logged:logged});
        }
      }).catch((err)=>{
          res.render('register', {'message':'Email or username alredy taken, try another one',logged:logged});
        });
    };
});

  module.exports = router;