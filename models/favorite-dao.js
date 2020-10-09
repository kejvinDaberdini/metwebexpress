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
      const sql= 'SELECT * FROM episode JOIN favorite WHERE favorite.userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(rows);
      })
    })
  }