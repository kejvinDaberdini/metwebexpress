'use strict';

const db = require('../db.js');

exports.buyEpisode = function(episodeID,userID,name,surname,cardType,cardNumber,CVV){
    return new Promise((resolve, reject)=>{
      //console.log(episodeID,userID);
      const sql = 'INSERT INTO purchase (episodeID, userID, name, surname, cardType, cardNumber, CCV) VALUES(?, ?, ?, ?, ?, ?, ?)';
      db.run(sql,[episodeID,userID, name, surname, cardType, cardNumber, CVV],(err,row)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(row);
      })    
    })
  }

  exports.getPurchaseByUser=function(userID){
    return new Promise((resolve,reject)=>{
      const sql='SELECT * FROM purchase WHERE userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(rows);

      })
    })

  }