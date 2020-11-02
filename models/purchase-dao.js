'use strict';

const db = require('../db.js');

exports.buyEpisode = function(episodeID,userID,name,surname,cardType, cardDate, cardNumber,CVV){
    return new Promise((resolve, reject)=>{

      const sql = 'INSERT INTO purchase (episodeID, userID, name, surname, cardType, cardDate, cardNumber, cvv) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
      db.run(sql,[episodeID,userID, name, surname, cardType,cardDate, cardNumber, CVV],(err,row)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(row);
      });    
    }); 
  }; 
//get al purchased episode by user
  exports.getPurchaseByUser=function(userID){
    return new Promise((resolve,reject)=>{
      const sql='SELECT * FROM purchase WHERE userID=?';
      db.all(sql,[userID],(err,rows)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(rows);

      }); 
    }); 

  }; 
//check if episode is bought
  exports.isBought=function(userID, episodeID){
    return new Promise((resolve,reject)=>{
      const sql='SELECT * FROM purchase WHERE userID=? and episodeID=?';
      db.get(sql,[userID,episodeID],(err,row)=>{
        if(err){
          reject(err);
          return;
        };
        resolve(row);

      }); 
    }); 

  }; 