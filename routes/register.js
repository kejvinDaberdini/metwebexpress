const dao = require('../models/user-dao.js');
const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/register', function(req,res,next){
  let logged = req.isAuthenticated();  
  res.render('register', {title: 'Registration page', logged:logged});
});

/* register ancora da implementare */
router.post('/register', function(req, res, next){
  let logged = req.isAuthenticated(); 
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const creator = (req.body.creator=='on')? 1:0;

      const newUser = {
        
        username: username,
        email: email,
        password: password,
        creator : creator
      };
  
      dao.createUser(newUser).then (err =>{
        if(err)
        {
          res.render('login', {title: 'login page', 'message':'registration succesful',logged:logged});
          
        }
        else
        {
          res.render('register', {title: 'register page', 'message':'wrong data , try again',logged:logged});
        }
      });

  });

  module.exports = router;