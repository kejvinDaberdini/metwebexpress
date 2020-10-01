'use strict';

const userdao = require('../models/user-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const episodedao = require('../models/episode-dao.js');
const express = require('express');
const router = express.Router();

router.get('/dashboard', function(req, res, next) {
  let logged = req.isAuthenticated();
  //if(req.isAuthenticated()){
  //  logged = true;
  //} 
  //else {
  //  logged = false;
  //}
      podcastdao.getPodcastsByUser(req.user.userID).then((podcasts)=>{
          res.render('dashboard', {title: 'Dashboard', podcasts:podcasts})
      })

});

router.post('/dashboard/addPodcast', function(req, res, next) {
    
    userdao.getUserById(req.user.userID).then((creator)=>{
      console.log(req.body.newTitle, creator.username, req.body.newDesc,req.user.userID);
      podcastdao.addPodcast(req.body.newTitle, creator.username,req.body.newDesc,req.body.newCategory,req.body.newImg, creator.userID)
    .then(()=> {
      res.redirect('back');
    })
    })
    
    /*.catch(()=>{
      res.redirect('/');
    });*/
  });

module.exports = router;
