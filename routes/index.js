'use strict';
const categorydao= require('../models/category-dao');
const podcastdao = require('../models/podcast-dao.js');
//const followdao = require('../models/follow-dao.js');
//const episodedao = require('../models/episode-dao.js');
const express = require('express');
const router = express.Router();


//this gets the route page, unregistred users will be ridirected here , while registred users to their homepages
router.get('/', function(req, res, next) {
  const logged = req.isAuthenticated(); 
  let username;
  const pagecat="All"; 
  if (!logged){
    username="";
  }
  else{
    username=req.user.username;
  };

  categorydao.getAllCategories()
  .then((categories)=>{
    podcastdao.getAllPodcasts()
    .then((podcasts) => { 
      res.render('podcasts', {title: 'Podcasts', podcasts, categories, logged:logged, username, pagecat,user:req.user});
    });
  }); 
});
//this get the podcasts of a specified category
router.get('/categories/:category', function(req, res, next){
  let logged = req.isAuthenticated(); 
  let username;

  const pagecat= req.params.category;

  if (!logged){
     username="";

  }
  else{
    username=req.user.username;
  };
  categorydao.getAllCategories()
  .then((categories)=>{

    podcastdao.getPodcastsByCategory(req.params.category)
    .then((podcasts) => {
      if (!logged){
        res.render('podcasts', {title: 'Podcasts', podcasts, categories:categories, logged:logged, username, pagecat});
      }else{
        res.render('podcasts', {title: 'Podcasts', podcasts, categories:categories, logged:logged, username, pagecat,user:req.user});
      };

      
    }).catch((err)=> res.render('error',{error:err}));
   }).catch((err)=> res.render('error',{error:err}));
});

module.exports = router;
