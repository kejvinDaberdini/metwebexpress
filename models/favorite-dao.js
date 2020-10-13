'use strict';

const db = require('../db.js');
const moment = require('moment');

exports.favoriteEpisode = function(userID,episodeID){
    return new Promise((resolve, reject)=>{
      const sql ="INSERT INTO favorite(userID,episodeID) VALUES(?,?)";
      db.run(sql,[userID,episodeID],function(err){
        if(err){
          reject(err);
        }
        else{
          resolve(this.lastID);
        }
      })
    })
  }

exports.getFavoriteEpisodes = function(userID){
    return new Promise((resolve, reject)=>{
      const sql= 'SELECT episode.episodeID AS episodeID, episode.title AS title, episode.description AS description, episode.price AS price, episode.sponsor AS sponsor, favorite.favoriteID AS favoriteID FROM episode JOIN favorite ON episode.episodeID= favorite.episodeID WHERE favorite.userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(rows);
      })
    })
  }

    //exports.unfollowPodcast = function(user, podcast){
    exports.unfavoriteEpisode = function(followID){
      return new Promise((resolve, reject)=>{
        //const sql = 'DELETE FROM follow WHERE userID=? and podcastID=?';
        const sql = 'DELETE FROM favorite WHERE favoriteID=?';
        //db.run(sql, [user,podcast], function(err){
          db.run(sql, [followID], function(err){
          if(err){
            reject(err);
          }
          else{
            resolve(this.lastID);
          }
        });
      });
    }
    
    exports.isFavorite = function(user,episode){
      return new Promise((resolve,reject)=>{
        const sql = "SELECT * FROM favorite WHERE userID=? AND episodeID=?";
        db.get(sql,[user,episode],(err,row)=>{
            if(err){
              reject(err);
            }
     //       else if(row==undefined){
     //         resolve (false);
     //       }
     //       else
     //         resolve(true);
            resolve(row);
        })
      })
    }