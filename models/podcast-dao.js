'use strict';

const db = require('../db.js');

exports.getAllPodcasts = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      //const podcasts = rows.map((e) => ({title: e.title, description: e.description, category: e.category, image: e.image, podcastID: e.podcastID}));
      //resolve(podcasts);
      resolve(rows);
    });
  });
};

exports.getPodcastsByUser = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast WHERE creatorID=?';
    db.all(sql,[id], (err, rows) => {
      if (err) {
        reject(err);
      };

      //const podcasts = rows.map((e) => ({title: e.title, description: e.description, category: e.category, image: e.image, podcastID: e.podcastID}));
      //resolve(podcasts);
      resolve(rows);
    });
  });
};

exports.getPodcastsByText = function(text) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast WHERE title OR description LIKE ?';
    db.all(sql, [text], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      //const podcasts = rows.map((e) => ({title: e.title, description: e.description, category: e.category, image: e.image, podcastID: e.podcastID}));
      //resolve(podcasts);
      resolve(rows);
    });
  });
};

exports.addPodcast = function(title,creator,description,category,image,userID){
  return new Promise((resolve, reject)=>{
    const sql = 'INSERT INTO podcast( title, creator, description, category, image, creatorID) VALUES( $title,$creator,$description,$category,$image, $creatorID)';
    console.log(title,creator,description,category,image,userID);
    const param= {$title:title, $creator:creator, $description:description, $category:category, $image:image, $creatorID:userID};
    db.run(sql, param, function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      }
    });
  });
}

exports.updatePodcast = function(title,description,category,image,podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'UPDATE podcast SET title=$title, description=$description, category=$category, image=$image WHERE podcastID=$podcastID';
    console.log(title,description,category,image,podcastID);
    const param= {$title:title, $description:description, $category:category, $image:image, $podcastID:podcastID};
    db.run(sql, param, function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      }
    });
  });
}

exports.deletePodcast = function(podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'DELETE  FROM podcast WHERE podcastID=?';
    console.log(podcastID); 
    db.run(sql, [podcastID], function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      }
    });
  });
}

exports.getAllCategories = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM category';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      };
      resolve(rows);
    });
  });
};