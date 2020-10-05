'use strict';

const dao = require('../models/podcast-dao.js');
const express = require('express');
const router = express.Router();



router.get('/', function(req, res, next) {
  let logged = req.isAuthenticated();
  dao.getAllPodcasts()
  .then((podcasts) => {
    res.render('podcasts', {title: 'Podcasts', podcasts});
  });
});
router.post('/podcast/follow',function(req,res,next){
  //console.log(req.body.podcastID,req.user.userID);
  let logged= req.isAuthenticated();
  
  if(!logged){
    res.redirect('/login');
  }
  else{
    
    dao.followPodcast(req.user.userID,req.body.podcastID)
    .then((follows) =>{
      res.redirect('back');
    });
  }
  
})

module.exports = router;
