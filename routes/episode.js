'use strict';

const episodedao = require('../models/episode-dao.js');
const commentdao = require('../models/comment-dao.js');
const purchasedao = require('../models/purchase-dao.js');
const express = require('express');
const { route } = require('./episodes.js');
const router = express.Router();


/* GET course (home) page */
/*
router.post('/episode', function(req, res, next) {
  console.log(req.body);
    dao.getEpisode(req.body.episodeID)
  .then((episode) => {
    console.log(req.body);
    dao.getComments(req.body.episodeID)
    .then((comments)=> {
      res.render('episode', {title : 'Episode', episode:episode, comments:comments});
    });
  });
});
*/
router.get('/episode/:episodeID', function(req, res, next) {
  let logged = req.isAuthenticated();

  //const username=req.user.username;
  episodedao.getEpisode(req.params.episodeID)
  .then((episode) => {
    console.log(req.body);
    commentdao.getComments(req.params.episodeID)
    .then((comments)=> {
      res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged });
    });
  });
});

router.post('/episode/favorite', function(req,res,next){
  episodedao.favoriteEpisode(req.user.userID,req.body.episodeID)
  .then(()=>{
    res.redirect('back');
  })
})


router.post('/episode/comment', function(req, res, next) {
  console.log(req.body.episodeID, req.user.userID, req.body.text);
  commentdao.addComment(req.body.text, req.body.episodeID, req.user.userID)
  .then((comments)=> {
    res.redirect('back');
  });
});

router.post('/episode/updateComment', function(req, res, next){
  console.log(req.body.newText, req.body.commentID);
  commentdao.updateComment(req.body.newText, req.body.commentID)
  .then(()=> {
    res.redirect('back');
  });
})

router.post('/episode/deleteComment', function(req, res, next){
  console.log(req.body.commentID);
  commentdao.deleteComment(req.body.commentID)
  .then(()=> {
    res.redirect('back');
  });
})

router.post('/episode/purchase', function(req, res, next){
  console.log(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV);
  purchasedao.buyEpisode(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV)
  .then(()=>{
    res.redirect('back');
  });
});

module.exports = router;
