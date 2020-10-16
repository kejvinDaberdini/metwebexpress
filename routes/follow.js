'use strict';

const dao = require('../models/follow-dao.js');
const express = require('express');
const router = express.Router();


router.post('/follows',function(req,res,next){
    dao.followPodcast(req.user.userID,req.body.podcastID)
    .then(() =>{
        res.redirect('back');
    });    
});

router.delete('/follows/:podcastID',function(req,res,next){
    dao.unfollowPodcast(req.body.followID)
    .then(() =>{
        res.redirect('back');
    }); 
});

module.exports = router;