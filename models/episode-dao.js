'use strict';

const db = require('../db.js');

exports.getAllEpisodes = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM episode JOIN podcast ON episode.podcastID=podcast.podcastID WHERE podcastID=?';
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