'use strict';

const episodedao = require('../models/episode-dao.js');
const commentdao = require('../models/comment-dao.js');
const purchasedao = require('../models/purchase-dao.js');
const favoritedao = require('../models/favorite-dao');
const categorydao = require('../models/category-dao');
const express = require('express');
const { route } = require('./episodes.js');
const fs= require('fs');
const router = express.Router();

const multer = require('multer');



const fileDestination = multer({dest: './audiofiles/'});

function deleteLocalFile(file){
  try {
   
      fs.unlinkSync(file)
    } catch(err) {
      console.error(err)
    };
  }



router.get('/episodes/:episodeID', function(req, res, next) {
  let logged = req.isAuthenticated();
  let username;
  let isbought;
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
          purchasedao.isBought(req.user.userID, req.params.episodeID)
          .then((purchase)=>{
            console.log(purchase);
            if(purchase == undefined){ isbought=false;}
            else   isbought = true;
            
            favoritedao.isFavorite(req.user.userID,req.params.episodeID)
          .then((favorite)=>{
                  res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged , username:username, favorite:favorite,categories, isbought});
            });

          })
          
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

router.put('/episodes/:episodeID',fileDestination.single('newFile'),  function(req, res, next) {  
const oldfile= req.body.oldFile;
console.log(oldfile);
episodedao.updateEpisode(req.body.newTitle, req.body.newDesc, req.file.path, req.body.price, req.body.episodeID, req.body.newSponsor)
.then(()=> {
  deleteLocalFile(oldfile);
  res.redirect('/dashboard');
})    
});

router.delete('/episodes/:episodeID', function(req, res, next) {  
  const oldfile= req.body.oldFile;

  episodedao.deleteEpisode(req.body.episodeID)
.then(()=> {
  deleteLocalFile(oldfile);
  res.redirect('back');
})    
});

/*
router.post('/episode/purchase', function(req, res, next){

  purchasedao.buyEpisode(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV)
  .then(()=>{
    res.redirect('back');
  });
});
*/

module.exports = router;
