'use strict';

const db = require('../db.js');
//function to get all podcasts from the database
exports.getAllPodcasts = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      //const podcasts = rows.map((e) => ({title: e.title, description: e.description, category: e.category, image: e.image, podcastID: e.podcastID}));
      //resolve(podcasts);
      resolve(rows);
    });
  });
};
//function to get a podcast from its id
exports.getPodcast = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast WHERE podcastID=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      }
      /*const episode = row.map((e) => (
        {
          episodeID: e.episodeID,
          title: e.title, 
          description: e.description, 
          file: e.file,
          price: e.price,
        }
      ));*/

      resolve(row);
    });
  });
};
//function to get all podcasts from a creator
exports.getPodcastsByUser = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM podcast WHERE creatorID=?';
    db.all(sql,[id], (err, rows) => {
      if (err) {
        reject(err);
      };

      //const podcasts = rows.map((e) => ({title: e.title, description: e.description, category: e.category, image: e.image, podcastID: e.podcastID}));
      //resolve(podcasts);
      resolve(rows);
    });
  });
};

//function to add a new podcast into the database
exports.addPodcast = function(title,creator,description,category,image,userID){
  return new Promise((resolve, reject)=>{
    const sql = 'INSERT INTO podcast( title, creator, description, category, image, creatorID) VALUES( $title,$creator,$description,$category,$image, $creatorID)';
    console.log(title,creator,description,category,image,userID);
    const param= {$title:title, $creator:creator, $description:description, $category:category, $image:image, $creatorID:userID};
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
//function to update the podcast from the database
exports.updatePodcast = function(title,description,category,image,podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'UPDATE podcast SET title=$title, description=$description, category=$category, image=$image WHERE podcastID=$podcastID';
    console.log(title,description,category,image,podcastID);
    const param= {$title:title, $description:description, $category:category, $image:image, $podcastID:podcastID};
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
//function to delete the podcast from the database
exports.deletePodcast = function(podcastID){
  return new Promise((resolve, reject)=>{
    const sql = 'DELETE  FROM podcast WHERE podcastID=?';
    console.log(podcastID); 
    db.run(sql, [podcastID], function(err){
      if(err){
        reject(err);
      }
      else{
        resolve(this.lastID);
      }
    });
  });
}

//function to get all podcasts that contain an input text in their title or description
exports.getPodcastsByText = function(text, category) {
  let param;
  let sql;
  const search='%'+text+'%';
  console.log("questi è il testo ricevuto dal controller",text, category);
  return new Promise((resolve, reject) => {
    if(category =="All"){
      param= {$text:search};
      sql = 'SELECT * FROM podcast WHERE title LIKE $text OR description LIKE $text   ';
      

    }else{
      param= {$text:search,$category:category};
      sql = 'SELECT * FROM podcast WHERE category == $category AND  title LIKE $text OR description LIKE $text ';
      
    }
 
    db.all(sql, param, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      //const podcasts = rows.map((e) => ({title: e.title, description: e.description, category: e.category, image: e.image, podcastID: e.podcastID}));
      //resolve(podcasts);
      resolve(rows);
    });
  });
};