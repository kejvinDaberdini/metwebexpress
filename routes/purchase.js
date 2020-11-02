'use strict';
const dao = require('../models/purchase-dao.js');
const express = require('express');
const router = express.Router();



router.post('/episode/purchase', function(req, res, next){
  
 
  
  dao.buyEpisode(req.body.episodeID, req.user.userID, req.body.newName, req.body.newSurname, req.body.newCardType,req.body.newCardDate, req.body.newCardNumber, req.body.newCardCVV)
  .then(()=>{
      res.redirect('back');
  })
  .catch((err)=> res.render('error',{error:err}));
});

module.exports = router;
