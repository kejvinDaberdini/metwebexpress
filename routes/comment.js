'use strict';

const dao = require('../models/comment-dao');
const express = require('express');
const router = express.Router();



router.post('/comments', function(req, res, next) {

    dao.addComment(req.body.text, req.body.episodeID, req.user.userID)
    .then((comments)=> {
      res.redirect('back');
    });
  });
  
  router.put('/comments/:commentID', function(req, res, next){
  
    dao.updateComment(req.body.newText, req.body.commentID)
    .then(()=> {
      res.redirect('back');
    });
  })
  
  router.delete('/comments/:commentID', function(req, res, next){
  
    dao.deleteComment(req.body.commentID)
    .then(()=> {
      res.redirect('back');
    });
  })


module.exports = router;