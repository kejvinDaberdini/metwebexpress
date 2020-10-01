'use strict';

const dao = require('../models/episode-dao.js');
const express = require('express');
const { route } = require('./episodes.js');
const router = express.Router();


/* GET course (home) page */
/*
router.post('/episode', function(req, res, next) {
  console.log(req.body);
    dao.getEpisode(req.body.episodeID)
  .then((episode) => {
    console.log(req.body);
    dao.getComments(req.body.episodeID)
    .then((comments)=> {
      res.render('episode', {title : 'Episode', episode:episode, comments:comments});
    });
  });
});
*/
router.get('/episode/:episodeID', function(req, res, next) {
  console.log(req.body);
    dao.getEpisode(req.params.episodeID)
  .then((episode) => {
    console.log(req.body);
    dao.getComments(req.params.episodeID)
    .then((comments)=> {
      res.render('episode', {title : 'Episode', episode:episode, comments:comments});
    });
  });
});

router.post('/episode/comment', function(req, res, next) {
  console.log(req.body.episodeID, req.user.userID, req.body.text);
  dao.addComment(req.body.text, req.body.episodeID, req.user.userID)
  .then((comments)=> {
    res.redirect('back');
  });
});

module.exports = router;
