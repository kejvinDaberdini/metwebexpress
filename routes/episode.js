'use strict';

const episodedao = require('../models/episode-dao.js');
const commentdao = require('../models/comment-dao.js');
const purchasedao = require('../models/purchase-dao.js');
const favoritedao = require('../models/favorite-dao');
const categorydao = require('../models/category-dao');
const express = require('express');
const { route } = require('./episodes.js');
const router = express.Router();

const multer = require('multer');



const fileDestination = multer({dest: './audiofiles/'});



router.get('/episode/:episodeID', function(req, res, next) {
  let logged = req.isAuthenticated();
  let username;
  if (!logged){
     username="";
  }
  else username=req.user.username;
  //const username=req.user.username;
  categorydao.getAllCategories()
  .then((categories)=>{
  episodedao.getEpisode(req.params.episodeID)
  .then((episode) => {  
     commentdao.getComments(req.params.episodeID)
      .then((comments)=> {
        if(logged){
          favoritedao.isFavorite(req.user.userID,req.params.episodeID)
          .then((favorite)=>{
                  res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged , username:username, favorite:favorite,categories});
            });
        }
        else
            res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged , username:username, categories});
      
    })  
  });
});
});
/*
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
*/

router.post('/dashboard/addEpisode',fileDestination.single('newFile'), function(req, res, next) {   
  episodedao.addEpisode(req.body.newTitle, req.body.newDesc, req.file.path, req.body.newPrice, req.body.podcastID)
  .then(()=> {
    res.redirect('back');
  })
});

router.put('/put/episode', function(req, res, next) {  

episodedao.updateEpisode(req.body.newTitle, req.body.newDesc, req.body.newFile, req.body.price, req.body.episodeID)
.then(()=> {
  res.redirect('back');
})    
});

router.delete('/delete/episode/:episodeID', function(req, res, next) {  

  episodedao.deleteEpisode(req.body.episodeID)
.then(()=> {
  res.redirect('back');
})    
});


router.post('/episode/purchase', function(req, res, next){

  purchasedao.buyEpisode(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV)
  .then(()=>{
    res.redirect('back');
  });
});

module.exports = router;
