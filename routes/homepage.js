'use strict';

const userdao = require('../models/user-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const episodedao = require('../models/episode-dao.js');
const express = require('express');
const router = express.Router();

router.get('/homepage', function(req, res, next) {
  let logged = req.isAuthenticated();  
  let username = req.user.username;
  podcastdao.getAllCategories().then((categories)=>{
    podcastdao.getFollowedPodcasts(req.user.userID).then((podcasts)=>{
        episodedao.getFavoriteEpisodes(req.user.userID).then((episodes)=>{
            res.render('homepage', {title: 'Homepage', categories:categories, episodes:episodes, podcasts:podcasts, logged:logged, username:username})
        });
    });        
  });
});

module.exports = router;
