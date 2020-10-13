'use strict';

const db = require('../db.js');
const moment = require('moment');

exports.getAllEpisodes = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM episode  WHERE podcastID=?';
    db.all(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
      }

      const episodes = rows.map((e) => (
        {
          episodeID: e.episodeID,
          title: e.title, 
          description: e.description, 
          file: e.file,
          price: e.price,
          podcastID: e.podcastID,
          podcastDescription: e.description
        }
      ));
      resolve(episodes);
    });
  });
};

exports.getEpisode = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM episode WHERE episodeID=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

exports.getEpisodesByUser = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT episode.episodeID, episode.title, episode.file, episode.uploadDate, episode.price, episode.description  FROM episode JOIN podcast ON episode.podcastID=podcast.podcastID WHERE creatorID=?';
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

exports.addEpisode = function(title, description, file, price, podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'INSERT INTO episode( title, description, file, uploadDate, price, podcastID) VALUES( $title, $description, $file, $date, $price, $podcastID)';
    const time = moment().format('DD-MM-YYYY');
    
    const param= {$title:title, $description:description, $file:file, $date:time, $price:price, $podcastID:podcastID};
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

exports.updateEpisode = function(title, description, file, price, episodeID){
  return new Promise((resolve, reject)=>{
    
    const sql = 'UPDATE episode SET title=$title, description=$description, file=$file, price=$price WHERE episodeID=$episodeID';
    const param= {$title:title, $description:description, $file:file, $price:price, $episodeID:episodeID};
    console.log(episodeID,title,description,file,price);
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

exports.deleteEpisode = function(episodeID){
  return new Promise((resolve, reject)=>{
    const sql = 'DELETE  FROM episode WHERE episodeID=?';
    console.log(episodeID); 
    db.run(sql, [episodeID], function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      }
    });
  });
}

//function to get all podcasts that contain an input text in their title or description
exports.getEpisodesByText = function(text,category) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM episode JOIN podcast ON episode.podcastID=podcast.podcastID WHERE podcast.category=$category AND episode.title LIKE $text OR episode.description LIKE $search ';
      const search ='%'+text+'%';
      const params={$search:search, $category:category}
    db.all(sql, search, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("stampo:",rows);

      //const podcasts = rows.map((e) => ({title: e.title, description: e.description, category: e.category, image: e.image, podcastID: e.podcastID}));
      //resolve(podcasts);
      resolve(rows);
    });
  });
};