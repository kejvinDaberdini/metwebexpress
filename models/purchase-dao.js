'use strict';

const db = require('../db.js');

exports.buyEpisode = function(episodeID,userID){
    return new Promise((resolve, reject)=>{
      //console.log(episodeID,userID);
      const sql = 'INSERT INTO purchase (episodeID, userID) VALUES(?, ?)';
      db.run(sql,[episodeID,userID],(err,row)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(row);
      })    
    })
  }