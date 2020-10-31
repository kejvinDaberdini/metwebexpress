'use strict';

const dao = require('../models/favorite-dao');
const express = require('express');
const router = express.Router();


router.post('/favorites', function(req,res,next){
    dao.favoriteEpisode(req.user.userID,req.body.episodeID)
    .then(()=>{
      res.redirect('back');
    }).catch((err)=> res.render('error',{message:"Error in adding episode to favorites"}));
  });


router.delete('/favorites/:favoriteID', function(req,res,next){
   dao.unfavoriteEpisode(req.body.favoriteID)
    .then(()=>{
      res.redirect('back');
    }).catch((err)=> res.render('error',{message:"Error in deleting favorite episode"}));
  });

  module.exports = router;
