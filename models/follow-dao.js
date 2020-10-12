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
        console.log(row);
        resolve(row);
      })    
    })
  }

  exports.unfollowPodcast = function(user, podcast){
    return new Promise((resolve, reject)=>{
      console.log("sto cancellando:",user,podcast);
      const sql = 'DELETE FROM follow WHERE userID=? and podcastID=?';
      db.run(sql, [user,podcast], function(err){
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
      const sql= 'SELECT podcast.title, podcast.podcastID, podcast.image, podcast.creatorID, podcast.description FROM podcast JOIN follow WHERE podcast.podcastID=follow.podcastID AND follow.userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        console.log(rows);
        resolve(rows);
      })
    })
  }

exports.isFollowing = function(user,podcast){
  return new Promise((resolve,reject)=>{
    const sql = "SELECT * FROM follow WHERE userID=? AND podcastID=?";
    db.get(sql,[user,podcast],(err,row)=>{
        if(err){
          reject(err);
        }
        else if(row==undefined){
          resolve (false);
        }
        else
          resolve(row);
    })
  })
}