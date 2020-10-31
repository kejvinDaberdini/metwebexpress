'use strict';

const dao = require('../models/follow-dao.js');
const express = require('express');
const router = express.Router();


router.post('/follows',function(req,res,next){
    dao.followPodcast(req.user.userID,req.body.podcastID)
    .then(() =>{
        res.redirect('back');
    })
    .catch((err)=> res.render('error',{message:"Error in following podcast."}));    
});

router.delete('/follows/:podcastID',function(req,res,next){
    dao.unfollowPodcast(req.body.followID)
    .then(() =>{
        res.redirect('back');
    })
    .catch((err)=> res.render('error',{message:"Error in unfollowing podcast"}));
});

module.exports = router;