'use strict';

const dao = require('../models/comment-dao');
const express = require('express');
const router = express.Router();



router.post('/comments', function(req, res, next) {

    dao.addComment(req.body.text, req.body.episodeID, req.user.userID)
    .then((comments)=> {
      res.redirect('back');
    })
    .catch((err)=> res.render('error',{message:"Error in comment posting."}));
  });
  
  router.put('/comments/:commentID', function(req, res, next){
    //console.log(req.body);
    dao.updateComment(req.body.comment, req.params.commentID)
    .then(()=> {
      res.redirect('back');
    })
    .catch((err)=> res.render('error',{message:"Error in comment updating."}));
  })
  
  router.delete('/comments/:commentID', function(req, res, next){
  
    dao.deleteComment(req.body.commentID)
    .then(()=> {
      res.redirect('back');
    })
    .catch((err)=> res.render('error',{message:"Error in comment deleting."}));
  })


module.exports = router;