'use strict';
const categorydao= require('../models/category-dao');
const podcastdao = require('../models/podcast-dao.js');
const followdao = require('../models/follow-dao.js');
const episodedao = require('../models/episode-dao.js');
const express = require('express');
const router = express.Router();


router.post('/follows',function(req,res,next){
    followdao.followPodcast(req.user.userID,req.body.podcastID)
    .then(() =>{
        res.redirect('back');
    });    
});

router.delete('/follows/:podcastID',function(req,res,next){
    followdao.unfollowPodcast(req.body.followID)
    .then(() =>{
        res.redirect('back');
    }); 
});

module.exports = router;