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
      podcastdao.getPodcastsByUser(req.user.id).then((podcasts)=>{
          res.render('dashboard', {title: 'Dashboard', podcasts:podcasts})
      })

});

module.exports = router;
