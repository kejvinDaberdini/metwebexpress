'use strict';
const categorydao= require('../models/category-dao');
const podcastdao = require('../models/podcast-dao.js');
const followdao = require('../models/follow-dao.js');
const episodedao = require('../models/episode-dao.js');
const express = require('express');
const router = express.Router();



router.get('/', function(req, res, next) {
let logged = req.isAuthenticated(); 
categorydao.getAllCategories()
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
    followdao.getFollowedPodcasts(req.user.userID)
    .then((relation)=>{
      if(!relation.req.body.podcastID){
        followdao.followPodcast(req.user.userID,req.body.podcastID)
        .then((follows) =>{
          res.redirect('back');
        });
      }
      else{
          res.redirect('back');
      }
    })
    
  }
  
})

router.post("/search", function(req,res,next){
  let logged = req.isAuthenticated();  
  podcastdao.getPodcastsByText(req.body.text, "All")

      .then((resultPodcasts)=>{
          episodedao.getEpisodesByText(req.body.text)
          .then((resultEpisodes)=>{
            console.log("questi è il testo cercato",req.body.text);
            console.log("questi sono i podcasts",resultPodcasts);
              res.render('search', {title: 'Search', podcasts:resultPodcasts, episodes:resultEpisodes, logged:logged});
              })
          })  
})

module.exports = router;
