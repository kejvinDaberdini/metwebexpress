'use strict';
const categorydao = require('../models/category-dao.js');
const episodedao = require('../models/episode-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const express = require('express');
const router = express.Router();


router.get("/search", function(req,res,next){
    let logged = req.isAuthenticated(); 
    let username= "";
    console.log(req.query.newCategory)
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
                
             });
         }); 
    });  
});

module.exports = router;  