'use strict';

const dao = require('../models/episode-dao.js');
const dao2 = require('../models/podcast-dao.js');
const express = require('express');
const router = express.Router();

router.post('podcasts/search', function(req, res, next){
    const logged = req.isAuthenticated();
    dao.getPodcastByText()
    .then((search)=> {
        res.render('podcasts',{title: 'Podcasts', podcasts});
    });
});

module.exports = router;