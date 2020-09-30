'use strict';

const dao = require('../models/episode-dao.js');
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
  dao.getAllEpisodes(req.params.podcastID)
  .then((episodes) => {
    res.render('episodes', {title: 'Episodes', episodes: episodes, logged:logged});
  });
})

module.exports = router;
