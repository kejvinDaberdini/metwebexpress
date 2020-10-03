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