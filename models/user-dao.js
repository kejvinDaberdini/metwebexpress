'use strict';

const db = require('../db.js');
const bcrypt = require('bcrypt');

exports.getUserById = function(id) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE userID = ?';
      db.get(sql, [id], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
              const user = {id: row.userID, username: row.email}
              resolve(user);
          }
      });
  });
};

exports.getUser = function(email, password) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE email = ?';
      db.get(sql, [email], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
            const user = {id: row.userID, username: row.email};
            let check = false;
            
            if(bcrypt.compareSync(password, row.password))
              check = true;

            resolve({user, check});
          }
      });
  });
};

exports.createUser = function(newUser) {
    return new Promise((resolve, reject) => {
        const newpassword =bcrypt.hashSync(newUser.password, 3);
        const sql = 'INSERT INTO user(username, email, password, creator) VALUES($username, $email, $password, $creator)';
        const param= {$username: newUser.username, $email: newUser.email, $password: newpassword, $creator: newUser.creator};
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
 
