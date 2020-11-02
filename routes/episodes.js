'use strict';

const episodedao = require('../models/episode-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const categorydao = require('../models/category-dao');
const followdao = require('../models/follow-dao');

const express = require('express');
const router = express.Router();

//get the podcast page
router.get('/podcasts/:podcastID', function(req, res, next){
  let logged = req.isAuthenticated();
  let username="";
  if(logged){
    username=req.user.username;}
  categorydao.getAllCategories()
  .then((categories)=>{
    podcastdao.getPodcast(req.params.podcastID).then((podcast)=>{
      episodedao.getAllEpisodes(req.params.podcastID).then((episodes) => {
        if(logged){
           followdao.isFollowing(req.user.userID,req.params.podcastID)
            .then((following)=>{  
            
               
          res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged, following:following, categories, username,user:req.user,message:req.flash('message')});
         })
         .catch((err)=> res.render('error',{error:err}));
        }else{
          res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged, categories, username,message:req.flash('message')});
        };
      })
      .catch((err)=> res.render('error',{error:err}));  
  })
  .catch((err)=> res.render('error',{error:err}));
})
.catch((err)=> res.render('error',{error:err}));
});

module.exports = router;
