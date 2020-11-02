'use strict';

const db = require('../db.js');
const moment = require('moment');
//add to favorites
exports.favoriteEpisode = function(userID,episodeID){
    return new Promise((resolve, reject)=>{
      const sql ="INSERT INTO favorite(userID,episodeID) VALUES(?,?)";
      db.run(sql,[userID,episodeID],function(err){
        if(err){
          reject(err);
        }
        else{
          resolve(this.lastID);
        };
      });
    });
  };
//get all favorites
exports.getFavoriteEpisodes = function(userID){
    return new Promise((resolve, reject)=>{
      const sql= 'SELECT episode.episodeID AS episodeID, episode.title AS title, episode.description AS description, episode.price AS price, episode.sponsor AS sponsor, favorite.favoriteID AS favoriteID , podcast.image AS image FROM episode JOIN favorite ON episode.episodeID= favorite.episodeID JOIN podcast ON episode.podcastID=podcast.podcastID WHERE favorite.userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(rows);
      });
    });
  };

//remove favorite
    exports.unfavoriteEpisode = function(followID){
      return new Promise((resolve, reject)=>{

        const sql = 'DELETE FROM favorite WHERE favoriteID=?';

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
//checks if a is favorite  
    exports.isFavorite = function(user,episode){
      return new Promise((resolve,reject)=>{
        const sql = "SELECT * FROM favorite WHERE userID=? AND episodeID=?";
        db.get(sql,[user,episode],(err,row)=>{
            if(err){
              reject(err);
            }
            resolve(row);
        });
      });
    };