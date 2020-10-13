'use strict';

const episodedao = require('../models/episode-dao.js');
const commentdao = require('../models/comment-dao.js');
const purchasedao = require('../models/purchase-dao.js');
const favoritedao = require('../models/favorite-dao');
const express = require('express');
const { route } = require('./episodes.js');
const router = express.Router();



router.get('/episode/:episodeID', function(req, res, next) {
  let logged = req.isAuthenticated();
  let username;
  if (!logged){
     username="";
  }
  else username=req.user.username;
  //const username=req.user.username;
  episodedao.getEpisode(req.params.episodeID)
  .then((episode) => {  
     commentdao.getComments(req.params.episodeID)
      .then((comments)=> {
        if(logged){
          favoritedao.isFavorite(req.user.userID,req.params.episodeID)
          .then((favorite)=>{
                  res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged , username:username, favorite:favorite});
            });
        }
        else
            res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged , username:username});
      
    })  
  });
});

router.post('/episode/favorite', function(req,res,next){
  favoritedao.favoriteEpisode(req.user.userID,req.body.episodeID)
  .then(()=>{
    res.redirect('back');
  })
})

router.delete('/delete/favorite/:favoriteID', function(req,res,next){
  favoritedao.unfavoriteEpisode(req.body.favoriteID)
  .then(()=>{
    res.redirect('back');
  })
})


router.post('/episode/comment', function(req, res, next) {

  commentdao.addComment(req.body.text, req.body.episodeID, req.user.userID)
  .then((comments)=> {
    res.redirect('back');
  });
});

router.put('/put/comment/:commentID', function(req, res, next){

  commentdao.updateComment(req.body.newText, req.body.commentID)
  .then(()=> {
    res.redirect('back');
  });
})

router.delete('/delete/comment/:commentID', function(req, res, next){

  commentdao.deleteComment(req.body.commentID)
  .then(()=> {
    res.redirect('back');
  });
})

router.post('/episode/purchase', function(req, res, next){

  purchasedao.buyEpisode(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV)
  .then(()=>{
    res.redirect('back');
  });
});

module.exports = router;
