'use strict';

const db = require('../db.js');
const moment = require('moment');

exports.getComments = function(id){
    return new Promise((resolve, reject)=> {
      const sql = 'SELECT commentID, username, commentText, uploadDate, user.userID AS userID FROM comment JOIN user  ON comment.userID = user.userID  where episodeID=? ';
      db.all(sql, [id], (err, rows)=> {
        if(err){
          reject(err);
        }
        
        resolve(rows);
      })
    })
  }

  exports.addComment = function(text, episodeID, userID){
    return new Promise((resolve, reject)=>{
      const sql = 'INSERT INTO comment( commentText, episodeID, userID, uploadDate) VALUES( $commentText, $episodeID, $userID, $date)';
      const time = moment().format('DD-MM-YYYY');
      const param= {$commentText:text, $episodeID:episodeID, $userID:userID, $date:time};
      db.run(sql, param, function(err){
        if(err){
          reject(err);
        }
        else{
          resolve(this.lastID);
        }
      });
    });
  }

  exports.updateComment = function(newText, commentID){
    return new Promise((resolve, reject)=>{
      console.log(newText, commentID);
      const sql = 'UPDATE comment SET commentText= $newText, uploadDate = $date WHERE commentID= $commentID';
      const time = moment().format('DD-MM-YYYY');
      const param={$newText:newText, $commentID:commentID, $date:time};
     
      db.run(sql,param,  function(err){
        if(err){
          reject(err);
        }
        else{
          resolve(this.lastID);
        }
      });
    });
  }
  
  exports.deleteComment = function(id){
    return new Promise((resolve, reject)=>{
      const sql = 'DELETE FROM comment WHERE commentID=?';
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