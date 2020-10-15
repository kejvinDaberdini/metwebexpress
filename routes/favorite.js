'use strict';

const favoritedao = require('../models/favorite-dao');
const express = require('express');
const router = express.Router();


router.post('/favorites', function(req,res,next){
    favoritedao.favoriteEpisode(req.user.userID,req.body.episodeID)
    .then(()=>{
      res.redirect('back');
    });
  });


router.delete('/favorites/:favoriteID', function(req,res,next){
    favoritedao.unfavoriteEpisode(req.body.favoriteID)
    .then(()=>{
      res.redirect('back');
    });
  });

  module.exports = router;
