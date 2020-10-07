'use strict';

const db = require('../db.js');


exports.followPodcast = function(userID,podcastID){
    return new Promise((resolve, reject)=>{
      console.log(userID,podcastID);
      const sql = 'INSERT INTO follow(userID, podcastID) VALUES(?, ?)';
      db.run(sql,[userID, podcastID],(err,row)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(row);
      })    
    })
  }

  exports.deleteFollow = function(id){
    return new Promise((resolve, reject)=>{
      const sql = 'DELETE FROM follow WHERE followID=?';
      db.run(sql, [id], function(err){
        if(err){
          reject(err);
        }
        else{
          resolve(this.lastID);
        }
      });
    });
  }
  
  exports.getFollowedPodcasts = function(userID){
    return new Promise((resolve, reject)=>{
      const sql= 'SELECT podcast.title FROM podcast JOIN follow WHERE podcast.podcastID=follow.podcastID AND follow.userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(rows);
      })
    })
  }