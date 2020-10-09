'use strict';

const db = require('../db.js');

//function to get all categories from the database

exports.getAllCategories = function() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM category';
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        };
        resolve(rows);
      });
    });
  };
  