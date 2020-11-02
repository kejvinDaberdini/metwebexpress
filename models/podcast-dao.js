'use strict';

const db = require('../db.js');
const { isFollowing } = require('./follow-dao.js');
// get all podcasts from the database
exports.getAllPodcasts = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
};
//get a podcast from its id
exports.getPodcast = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast WHERE podcastID=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      };

      resolve(row);
    });
  });
};
//get all podcasts from a creator
exports.getPodcastsByUser = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast WHERE creatorID=?';
    db.all(sql,[id], (err, rows) => {
      if (err) {
        reject(err);
      };


      resolve(rows);
    });
  });
};

// add a new podcast into the database
exports.addPodcast = function(title,creator,description,category,image,userID){
  return new Promise((resolve, reject)=>{
    const sql = 'INSERT INTO podcast( title, creator, description, category, image, creatorID) VALUES( $title,$creator,$description,$category,$image, $creatorID)';

    const param= {$title:title, $creator:creator, $description:description, $category:category, $image:image, $creatorID:userID};
    db.run(sql, param, function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      };
    });
  });
};
// update the podcast from the database
exports.updatePodcast = function(title,description,category,image,podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'UPDATE podcast SET title=$title, description=$description, category=$category, image=$image WHERE podcastID=$podcastID';

    const param= {$title:title, $description:description, $category:category, $image:image, $podcastID:podcastID};
    db.run(sql, param, function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      };
    });
  });
};
// delete the podcast from the database
exports.deletePodcast = function(podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'DELETE  FROM podcast WHERE podcastID=?';
 
    db.run(sql, [podcastID], function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      };
    });
  });
};

//get all podcasts that contain an input text in their title or description
exports.getPodcastsByText = function(text, category) {
  let param;
  let sql;
  const search='%'+text+'%';

  return new Promise((resolve, reject) => {
    
    if(category =="All"){

      param= {$text:search};
      sql = 'SELECT * FROM podcast WHERE title LIKE $text OR description LIKE $text  ORDER BY title  ';
      

    }else{
    
      param= {$text:search,$category:category};
      sql = 'SELECT * FROM podcast WHERE category=$category AND  (title LIKE $text OR description LIKE $text) ORDER BY title ';
      
    }
 
    db.all(sql, param, (err, rows) => {
      if (err) {
        reject(err);
        return;
      };

      resolve(rows);
    });
  });
};
//get podcast of specific category only
exports.getPodcastsByCategory = function(category){
  return new Promise((resolve, reject) => {
     const sql="SELECT * FROM podcast WHERE category=?";
      db.all(sql,[category],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(rows);
      });
    });
  };

