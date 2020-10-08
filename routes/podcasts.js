'use strict';

const podcastdao = require('../models/podcast-dao.js');
const episodedao = require('../models/podcast-dao.js');
const express = require('express');
const router = express.Router();



router.get('/', function(req, res, next) {
let logged = req.isAuthenticated(); 
podcastdao.getAllCategories()
.then((categories)=>{
  podcastdao.getAllPodcasts()
  .then((podcasts) => {
    console.log(categories.length);
    res.render('podcasts', {title: 'Podcasts', podcasts, categories:categories, logged:logged});
  });
 }); 
});
router.post('/podcast/follow',function(req,res,next){
  //console.log(req.body.podcastID,req.user.userID);
  let logged= req.isAuthenticated();
  
  if(!logged){
    res.redirect('/login');
  }
  else{
    
    podcastdao.followPodcast(req.user.userID,req.body.podcastID)
    .then((follows) =>{
      res.redirect('back');
    });
  }
  
})

router.post("/search", function(req,res,next){
  let logged = req.isAuthenticated();  
  podcastdao.getPodcastsByText(text, category)
      .then((resultPodcasts)=>{
          episodedao.getEpisodesByText(text)
          .then((resultEpisodes)=>{
              res.render('search', {title: 'Search', podcasts:resultPodcasts, episodes:resultEpisodes, logged:logged});
              })
          })  
})

module.exports = router;
