'use strict';


const podcastdao = require('../models/podcast-dao.js');
const categorydao= require('../models/category-dao');
const episodedao = require('../models/episode-dao.js');
const express = require('express');
const router = express.Router();






//get creator dashboard
router.get('/dashboard', function(req, res, next) {
  const logged = req.isAuthenticated();  
  const creator = req.user.creator;
  const user= req.user;

  categorydao.getAllCategories().then((categories)=>{
    podcastdao.getPodcastsByUser(req.user.userID).then((podcasts)=>{
        episodedao.getEpisodesByUser(req.user.userID).then((episodes)=>{
          res.render('dashboard', {title: 'Dashboard', podcasts:podcasts, categories:categories, episodes:episodes, creator:creator, logged:logged, user, username:user.username,message:req.flash('message')})
        });
     });        
  });
});

router.get('/dashboard/addPodcast', function(req,res,next){
    categorydao.getAllCategories().then((categories)=>{
    res.render('addPodcast',{categories,userID:req.user.userID,message:req.flash('message')})
    });
});


router.get('/dashboard/updatePodcast/:podcastID', function(req,res,next){
  const podcastID= req.params.podcastID;
  podcastdao.getPodcast(podcastID).then((oldpodcast)=>{
    categorydao.getAllCategories().then((categories)=>{
    res.render('updatePodcast',{podcastID, categories, oldpodcast,message:req.flash('message')})
    });
  });
});


router.get('/dashboard/:podcastID/addEpisode', function(req,res,next){

    res.render('addEpisode',{podcastID:req.params.podcastID,message:req.flash('message')})
});


router.get('/dashboard/updateEpisode/:episodeID', function(req,res,next){
  const episodeID= req.params.episodeID;
  episodedao.getEpisode(episodeID).then((oldepisode)=>{
    res.render('updateEpisode',{episodeID, oldepisode,message:req.flash('message')})
  });
});
 


module.exports = router;
