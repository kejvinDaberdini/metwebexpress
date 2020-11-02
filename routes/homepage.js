'use strict';

const categorydao = require('../models/category-dao.js');
const episodedao = require('../models/episode-dao.js');
const favoritedao = require('../models/favorite-dao');
const followdao = require('../models/follow-dao');
const express = require('express');
const router = express.Router();
//get users homepage
router.get('/homepage', function(req, res, next) {
  let logged = req.isAuthenticated();  
  const username = req.user.username;
  const user = req.user;
  categorydao.getAllCategories().then((categories)=>{
    followdao.getFollowedPodcasts(req.user.userID).then((podcasts)=>{
        favoritedao.getFavoriteEpisodes(req.user.userID).then((episodes)=>{
          episodedao.getNewEpisodes(req.user.userID).then((newEpisodes)=>{
            res.render('homepage', {title: 'Homepage', categories:categories, episodes:episodes, podcasts:podcasts, logged:logged, username:username, user, newEpisodes})
          }).catch((err)=> res.render('error',{error:err}));           
        }).catch((err)=> res.render('error',{error:err}));
    }).catch((err)=> res.render('error',{error:err}));        
  }).catch((err)=> res.render('error',{error:err}));
});

module.exports = router;
