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
        if(logged){
           followdao.isFollowing(req.user.userID,req.params.podcastID)
            .then((following)=>{  
            
               
          res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged, following:following});
         });
        }else{
          res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged});
        }
      });    
  });
});

router.post('/podcast/follow',function(req,res,next){
  //console.log(req.body.podcastID,req.user.userID);
    followdao.followPodcast(req.user.userID,req.body.podcastID)
    .then(() =>{
      res.redirect(req.get('referer'));
    }); 
});

router.delete('/delete/follow/:podcastID',function(req,res,next){
  //console.log(req.body.podcastID,req.user.userID);
    //followdao.unfollowPodcast(req.user.userID,req.body.podcastID)
    followdao.unfollowPodcast(req.body.followID)
    .then(() =>{
      res.redirect('back');
    }); 
});

router.post('/episode/purchase', function(req, res, next){

  purchasedao.buyEpisode(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType, req.body.newCardNumber, req.body.newCardCCV)
  .then(()=>{
    res.redirect('back');
  });
});

module.exports = router;
