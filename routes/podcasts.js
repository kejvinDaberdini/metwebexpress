'use strict';

const dao = require('../models/podcast-dao.js');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  let logged = req.isAuthenticated();
  //if(req.isAuthenticated()){
  //  logged = true;
  //} 
  //else {
  //  logged = false;
  //}

  dao.getAllPodcasts()
  .then((podcasts) => {
    res.render('podcasts', {title: 'Podcasts', podcasts});
  });
});

module.exports = router;
