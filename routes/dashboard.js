'use strict';

//const userdao = require('../models/user-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const categorydao= require('../models/category-dao');
const episodedao = require('../models/episode-dao.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');



//const fileDestination  = multer({ dest: './uploads/' });
//const fileDestination2 = multer({dest: './audiofiles/'});


router.get('/dashboard', function(req, res, next) {
  const logged = req.isAuthenticated();  
  const creator = req.user.creator;
  const username= req.user.username;

  categorydao.getAllCategories().then((categories)=>{
    podcastdao.getPodcastsByUser(req.user.userID).then((podcasts)=>{
        episodedao.getEpisodesByUser(req.user.userID).then((episodes)=>{
          res.render('dashboard', {title: 'Dashboard', podcasts:podcasts, categories:categories, episodes:episodes, creator:creator, logged:logged, username:username})
        }); 
     });        
  });
});


router.get('/dashboard/updatePodcast/:podcastID', function(req,res,next){
  const podcastID= req.params.podcastID;
  console.log(podcastID);
  categorydao.getAllCategories().then((categories)=>{
  res.render('updatePodcast',{podcastID, categories})
  })
})

router.get('/dashboard/updateEpisode/:episodeID', function(req,res,next){
  const episodeID= req.params.episodeID;
  console.log(episodeID);
 
  res.render('updateEpisode',{episodeID})
})


/*
router.post('/dashboard/addPodcast',fileDestination.single('newImg'), function(req, res, next) {   
  userdao.getUserById(req.user.userID).then((creator)=>{
    console.log(req.file.path);
    podcastdao.addPodcast(req.body.newTitle, creator.username,req.body.newDesc,req.body.newCategory,req.file.path, creator.userID)
    .then(()=> {
      res.redirect('back');
    })
  })
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

router.post('/dashboard/addEpisode',fileDestination2.single('newFile'), function(req, res, next) {   
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
*/


module.exports = router;
