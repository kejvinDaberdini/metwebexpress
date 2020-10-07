'use strict';

const db = require('../db.js');

exports.buyEpisode = function(episodeID,userID,name,surname,cardType,cardNumber,CCV){
    return new Promise((resolve, reject)=>{
      //console.log(episodeID,userID);
      const sql = 'INSERT INTO purchase (episodeID, userID, name, surname, cardType, cardNumber, CCV) VALUES(?, ?, ?, ?, ?, ?, ?)';
      db.run(sql,[episodeID,userID, name, surname, cardType, cardNumber, CCV],(err,row)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(row);
      })    
    })
  }