'use strict';

const episodedao = require('../models/episode-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const categorydao = require('../models/category-dao');
const followdao = require('../models/follow-dao');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const fileDestination  = multer({ dest: './uploads/' });

router.post('/podcasts',fileDestination.single('newImg'), function(req, res, next) {   
    userdao.getUserById(req.user.userID).then((creator)=>{
      console.log(req.file.path);
      podcastdao.addPodcast(req.body.newTitle, creator.username,req.body.newDesc,req.body.newCategory,req.file.path, creator.userID)
      .then(()=> {
        res.redirect('back');
      })
    })
  });

router.get('/podcasts/:podcastID', function(req, res, next){
    let logged = req.isAuthenticated();
    let username= "";
    if(logged){
        username=req.user.username;
    }
    categorydao.getAllCategories()
    .then((categories)=>{
      podcastdao.getPodcast(req.params.podcastID).then((podcast)=>{
        episodedao.getAllEpisodes(req.params.podcastID).then((episodes) => {
          if(logged){
             followdao.isFollowing(req.user.userID,req.params.podcastID)
              .then((following)=>{  
              
                 
            res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged, following:following, categories, username});
           });
          }else{
            res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged, categories});
          }
        });    
    });
  });
});

router.put('/put/podcast', function(req, res, next) {  
    //console.log(req.body.newTitle, req.body.newDesc,req.body.newCategory, req.body.oldPodcast);
  podcastdao.updatePodcast(req.body.newTitle, req.body.newDesc, req.body.newCategory, req.body.newImg, req.body.oldPodcast)
  .then(()=> {
    res.redirect('back');
  })    
});

router.delete('/delete/podcast/:podcastID', function(req, res, next) {  

    podcastdao.deletePodcast(req.body.podcastID )
  .then(()=> {
    res.redirect('back');
  })    
});


module.exports = router;