'use strict';

const episodedao = require('../models/episode-dao.js');
const podcastdao = require('../models/podcast-dao.js');
const categorydao = require('../models/category-dao');
const followdao = require('../models/follow-dao');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator')
const fs= require('fs');

const fileDestination  = multer({ dest: './uploads/' });  //is the folder where images will be put


function deleteLocalFile(oldfile){//deletes olf files when you edit/delete a podcast
  try {
   
      fs.unlinkSync(oldfile)
    } catch(err) {
 
    };
  }

router.post('/podcasts',fileDestination.single('newImg'),[ 
  body('newTitle').isLength({min: 1, max:50}),
  body('newDesc').isLength({min: 1, max:250})
  ], function(req, res, next) {   

    const errors = validationResult(req);
   

    if(!errors.isEmpty()){
      
      req.flash('message', "validation error");
      res.redirect('back');
    }
    else{
      const user= req.user.userID;
      const creator =req.user.username;
  
      podcastdao.addPodcast(req.body.newTitle, creator,req.body.newDesc,req.body.newCategory,req.file.path, user)
      .then(()=> {
        res.redirect('/dashboard');
      })
      .catch((err)=> res.render('error',{message:"Error in creating podcast"}));
    }
})
  

router.get('/podcasts/:podcastID', function(req, res, next){
    let logged = req.isAuthenticated();
   
    let username= "";
    if(logged){
        username=req.user.username;
    }
    categorydao.getAllCategories()
    .then((categories)=>{
      podcastdao.getPodcast(req.params.podcastID).then((podcast)=>{
        episodedao.getAllEpisodes(req.params.podcastID).then((episodes) => {
          if(logged){
             followdao.isFollowing(req.user.userID,req.params.podcastID)
              .then((following)=>{  
                 res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged, following:following, categories, username, user:req.user});
              }).catch((err)=> res.render('error',{error:err}));
              }else{
            res.render('episodes', {title: 'Episodes', episodes: episodes,  podcast:podcast, logged:logged, categories});
          }
        }).catch((err)=> res.render('error',{error:err}));    
    }).catch((err)=> res.render('error',{error:err}));
  }).catch((err)=> res.render('error',{error:err}));
});
//edit podcast
router.put('/podcasts/:podcastID',fileDestination.single('newImg'),[ 
  body('newTitle').isLength({min: 1, max:50}),
  body('newDesc').isLength({min: 1, max:250})
  ], function(req, res, next) {  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      
      req.flash('message', "validation error");
      res.redirect('back');
    }
    else{

      const oldfile= req.body.oldFile;
      podcastdao.updatePodcast(req.body.newTitle, req.body.newDesc, req.body.newCategory, req.file.path, req.body.podcastID)
      .then(()=> {
      
        deleteLocalFile(oldfile);
      
        res.redirect('/dashboard');
      })
      .catch((err)=> res.render('error',{error:err}));   
    };
});
//delete podcast
router.delete('/podcasts/:podcastID', function(req, res, next) {  

    const oldfile= req.body.oldFile;
    podcastdao.deletePodcast(req.params.podcastID )
  .then(()=> {
    deleteLocalFile(oldfile);
    res.redirect('back');
  })
  .catch((err)=> res.render('error',{error:err}));   
});


module.exports = router;