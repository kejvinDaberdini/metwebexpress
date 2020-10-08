'use strict';

const episodedao = require('../models/episode-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const express = require('express');
const router = express.Router();

router.get("/search", function(req,res,next){
    let logged = req.isAuthenticated();  
    podcastdao.getPodcastsByText(text, category)
        .then((resultPodcasts)=>{
            episodedao.getEpisodesByText(text)
            .then((resultEpisodes)=>{
                res.render('search', {title: 'Search', podcasts:resultPodcasts, episodes:resultEpisodes, logged:logged});
                })
            })  
})

module.exports = router;  