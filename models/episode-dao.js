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
      /*const episode = row.map((e) => (
        {
          episodeID: e.episodeID,
          title: e.title, 
          description: e.description, 
          file: e.file,
          price: e.price,
        }
      ));*/

      resolve(row);
    });
  });
};

exports.getEpisodesByUser = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT episode.episodeID, episode.title, episode.file, episode.dataCaricamento, episode.price, episode.description FROM episode JOIN podcast ON episode.podcastID=podcast.podcastID WHERE creatorID=?';
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

exports.getComments = function(id){
  return new Promise((resolve, reject)=> {
    const sql = 'SELECT commentID, username, commentText, user.userID AS userID FROM comment JOIN user  ON comment.userID = user.userID  where episodeID=? ';
    db.all(sql, [id], (err, rows)=> {
      if(err){
        reject(err);
      }
      
      resolve(rows);
    })
  })
}

exports.addComment = function(text, episodeID, userID){
  return new Promise((resolve, reject)=>{
    const sql = 'INSERT INTO comment( commentText, episodeID, userID) VALUES( $commentText, $episodeID, $userID)';
    const param= {$commentText:text, $episodeID:episodeID, $userID:userID};
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

exports.updateComment = function(newText, commentID){
  return new Promise((resolve, reject)=>{
    
    const sql = 'UPDATE comment SET commentText=? WHERE commentID=?';
    db.run(sql,[newText, commentID], function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(err);
      }
    });
  });
}

exports.deleteComment = function(id){
  return new Promise((resolve, reject)=>{
    const sql = 'DELETE FROM comment WHERE commentID=?';
    db.run(sql, [id], function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(err);
      }
    });
  });
}

exports.addEpisode = function(title, description, file, price, podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'INSERT INTO episode( title, description, file, dataCaricamento, price, podcastID) VALUES( $title, $description, $file, $date, $price, $podcastID)';
    const time = moment().format('DD-MM-YYYY');
    console.log();
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