'use strict';

const sqlite = require('sqlite3');
const moment = require('moment');

const db = new sqlite.Database('Test.db', (err) => {
  if (err) throw err;
});
db.run("PRAGMA foreign_keys=ON")

module.exports = db;