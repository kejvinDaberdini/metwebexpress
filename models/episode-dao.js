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

      
      resolve(rows);
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
    const sql = 'SELECT episode.episodeID AS episodeID, episode.title AS title, episode.file AS file, episode.uploadDate AS uploadDate, episode.price AS price, episode.description as description, podcast.title AS podcast, podcast.image AS image  FROM episode JOIN podcast ON episode.podcastID=podcast.podcastID WHERE creatorID=?';
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

exports.updateEpisode = function(title, description, file, price, episodeID, sponsor){
  return new Promise((resolve, reject)=>{
    
    const sql = 'UPDATE episode SET title=$title, description=$description, file=$file, price=$price, sponsor=$sponsor WHERE episodeID=$episodeID';
    const param= {$title:title, $description:description, $file:file, $price:price, $episodeID:episodeID, $sponsor:sponsor};
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
    let params;
    let sql;

    let search;
  if(text==""){
    search=text;
  }
   else search='%'+text+'%';
    if(category=="All"){
      params= {$search:search};

       sql = 'SELECT episode.episodeID AS episodeID, episode.title AS title, episode.description AS description, episode.uploadDate AS uploadDAte ,episode.price AS price, episode.sponsor AS sponsor, podcast.title AS podcast, podcast.image AS image FROM episode JOIN podcast ON episode.podcastID=podcast.podcastID WHERE episode.title LIKE $search OR episode.description LIKE $search ';
    }
    else{
      params={$search:search, $category:category}
       sql = ' SELECT episode.episodeID AS episodeID, episode.title AS title, episode.description AS description, episode.uploadDate AS uploadDAte , episode.price AS price, episode.sponsor AS sponsor, podcast.title AS podcast, podcast.image AS image FROM episode JOIN podcast ON episode.podcastID=podcast.podcastID WHERE podcast.category=$category AND(episode.title LIKE $search OR episode.description LIKE $search) '; 
    }   
    db.all(sql, params, (err, rows) => {
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