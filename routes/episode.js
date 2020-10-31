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
                  res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged ,user:req.user, username:username, favorite:favorite,categories, isbought});
              })
              .catch()
            })
            .catch()         
          }
          else
              res.render('episode', {title : 'Episode', episode:episode, comments:comments, logged:logged , username:username, categories}); 
      })
      .catch();  
    })
    .catch();
  })
  .catch();
});


router.post('/episodes',fileDestination.single('newFile'), function(req, res, next) {   
  console.log(req.body);
  episodedao.addEpisode(req.body.newTitle, req.body.newDesc, req.file.path,req.body.newSponsor, req.body.newPrice, req.body.podcastID)
  .then(()=> {
    res.redirect('/dashboard');
  })
  .catch((err)=> res.render('error',{message:"Error in episode posting."}));
});

router.put('/episodes/:episodeID',fileDestination.single('newFile'),  function(req, res, next) {  
  const oldfile= req.body.oldFile;
  episodedao.updateEpisode(req.body.newTitle, req.body.newDesc, req.file.path, req.body.price, req.body.episodeID, req.body.newSponsor)
  .then(()=> {
    deleteLocalFile(oldfile);
    res.redirect('/dashboard');
  })
  .catch((err)=> res.render('error',{message:"Error in episode update."}));   
});

router.delete('/episodes/:episodeID', function(req, res, next) {  
  console.log(req.body.oldfile);
  const oldfile= req.body.oldfile;

  episodedao.deleteEpisode(req.params.episodeID)
  .then(()=> {
    deleteLocalFile(oldfile);
    console.log("ho fatto");
    res.redirect('back');
  })
  .catch((err)=> res.render('error',{message:"Error in episode delete."}));
});

module.exports = router;
