'use strict';

const episodedao = require('../models/episode-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const purchasedao = require('../models/purchase-dao.js');
const followdao = require('../models/follow-dao');

const express = require('express');
const router = express.Router();


/* GET course (home) page */
/*
router.post('/episodes', function(req, res, next) {
  //let logged = req.isAuthenticated();
  dao.getAllEpisodes(req.body.podcastID)
  .then((episodes) => {
    res.render('episodes', {title: 'Episodes', episodes: episodes, logged:logged});
  });
});
*/
router.get('/podcasts/:podcastID', function(req, res, next){
  let logged = req.isAuthenticated();
  podcastdao.getPodcast(req.params.podcastID).then((podcast)=>{
    episodedao.getAllEpisodes(req.params.podcastID).then((episodes) => {
    res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged});
    });
  });
});

router.post('/podcast/follow',function(req,res,next){
  //console.log(req.body.podcastID,req.user.userID);
  let logged= req.isAuthenticated();
    followdao.followPodcast(req.user.userID,req.body.podcastID)
    .then((follows) =>{
      res.redirect('back');
    }); 
});



router.post('/episode/purchase', function(req, res, next){
  console.log(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV);
  purchasedao.buyEpisode(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV)
  .then(()=>{
    res.redirect('back');
  });
});

module.exports = router;
