'use strict';
const categorydao = require('../models/category-dao.js');
const episodedao = require('../models/episode-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const express = require('express');
const router = express.Router();

//search in podcasts AND episodes for the input text
router.get("/search", function(req,res,next){
    let logged = req.isAuthenticated(); 
    let username= "";

    if(logged){
        username=req.user.username;
    }
    categorydao.getAllCategories().then((categories)=>{
        podcastdao.getPodcastsByText(req.query.text, req.query.newCategory)
        
        .then((resultPodcasts)=>{        
            episodedao.getEpisodesByText(req.query.text, req.query.newCategory)
            .then((resultEpisodes)=>{
                if(logged){res.render('search', {title: 'Search', podcasts:resultPodcasts, episodes:resultEpisodes, logged:logged, categories, username:username, user:req.user});}
                else{res.render('search', {title: 'Search', podcasts:resultPodcasts, episodes:resultEpisodes, logged:logged, categories, username:username});}
                
             }).catch((err)=> res.render('error',{error:err}));
         }).catch((err)=> res.render('error',{error:err}));
    }).catch((err)=> res.render('error',{error:err})); 
});

module.exports = router;  