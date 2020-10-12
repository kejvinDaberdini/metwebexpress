'use strict';

const userdao = require('../models/user-dao.js');
const categorydao = require('../models/category-dao.js');
const episodedao = require('../models/episode-dao.js');
const favoritedao = require('../models/favorite-dao');
const followdao = require('../models/follow-dao');
const express = require('express');
const router = express.Router();

router.get('/homepage', function(req, res, next) {
  let logged = req.isAuthenticated();  
  let username = req.user.username;
  categorydao.getAllCategories().then((categories)=>{
    followdao.getFollowedPodcasts(req.user.userID).then((podcasts)=>{
        favoritedao.getFavoriteEpisodes(req.user.userID).then((episodes)=>{
            res.render('homepage', {title: 'Homepage', categories:categories, episodes:episodes, podcasts:podcasts, logged:logged, username:username})
        });
    });        
  });
});

router.post('/podcast/unfollow',function(req,res,next){
  //console.log(req.body.podcastID,req.user.userID);
    followdao.unfollowPodcast(req.user.userID,req.body.podcastID)
    .then(() =>{
      following=true;
      res.redirect('back');
    }); 
});

module.exports = router;
