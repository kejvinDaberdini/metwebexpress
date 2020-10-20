const dao = require('../models/user-dao.js');
const express = require('express');
const passport = require('passport');
const validator = require('express-validator');
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

    req.check('email','email non valida').isEmail

      const newUser = {
        
        username: username,
        email: email,
        password: password,
        creator : creator
      };
  
      dao.createUser(newUser).then (err =>{
        if(err)
        {
          res.render('login', { 'message':'registration succesful',logged:logged});
          
        }
        else
        {
          res.render('register', {'message':'wrong data , try again',logged:logged});
        }
      });

  });

  module.exports = router;