'use strict';

const db = require('../db.js');


exports.followPodcast = function(userID,podcastID){
    return new Promise((resolve, reject)=>{

      const sql = 'INSERT INTO follow(userID, podcastID) VALUES(?, ?)';
      db.run(sql,[userID, podcastID],(err,row)=>{
        if(err){
          reject(err);
          return;
        };

        resolve(row);
      });   
    });
  };


    exports.unfollowPodcast = function(followID){
    return new Promise((resolve, reject)=>{


      const sql = 'DELETE FROM follow WHERE followID=?';
 
        db.run(sql, [followID], function(err){
        if(err){
          reject(err);
        }
        else{
          resolve(this.lastID);
        };
      });
    });
  };
  //get all podcast user follows
  exports.getFollowedPodcasts = function(userID){
    return new Promise((resolve, reject)=>{
      const sql= 'SELECT podcast.title, podcast.podcastID, podcast.image, podcast.creatorID, podcast.description, follow.followID FROM podcast JOIN follow WHERE podcast.podcastID=follow.podcastID AND follow.userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };

        resolve(rows);
      });
    });
  };
//check if podcast if followed by user
exports.isFollowing = function(user,podcast){
  return new Promise((resolve,reject)=>{
    const sql = "SELECT * FROM follow WHERE userID=? AND podcastID=?";
    db.get(sql,[user,podcast],(err,row)=>{
        if(err){
          reject(err);
        };

        resolve(row);
    });
  });
};
