'use strict';

const dao = require('../models/comment-dao');
const express = require('express');
const { body, validationResult } = require('express-validator')
const router = express.Router();



router.post('/comments',[ 
  body('text').isLength({min: 1, max:250})
  ], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      
      req.flash('message', "error: comment too long");
      res.redirect('back');
    }
    else{

    dao.addComment(req.body.text, req.body.episodeID, req.user.userID)
    .then((comments)=> {
      res.redirect('back');
    })
    .catch((err)=> res.render('error',{error:err}));
  }
  });
  
  router.put('/comments/:commentID',[ 
    body('comment').isLength({min: 1, max:250})
    ], function(req, res, next){
    //console.log(req.body);
    console.log(req.body.comment);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log('AH, errore!',errors);
      req.flash('message', "error: comment too long");
      res.redirect('back');
    }
    else{
    dao.updateComment(req.body.comment, req.params.commentID)
    .then(()=> {
      res.redirect('back');
    })
    .catch((err)=> res.render('error',{error:err}));
  }
  })
  
  router.delete('/comments/:commentID', function(req, res, next){
  
    dao.deleteComment(req.body.commentID)
    .then(()=> {
      res.redirect('back');
    })
    .catch((err)=> res.render('error',{error:err}));
  })


module.exports = router;