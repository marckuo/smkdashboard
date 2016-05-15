/* jshint node: true */
var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var app_url;

if (env === 'development'){
  global.APP_URL = 'http://localhost:3000';
} else {
  global.APP_URL =  'https://quiet-castle-31566.herokuapp.com';
}

if (!global.hasOwnProperty('db')) {

  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL)
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  global.db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  // add your other models here
  }

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));

      global.db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if (global.db[modelName].associate) {
      global.db[modelName].associate(db);
    }
  });

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db

//--------------------------------------------------------------------------------
//
// 'use strict';
//
// var fs        = require('fs');
// var path      = require('path');
// var Sequelize = require('sequelize');
// var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
//
// var db        = {};
//
//
// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
//
// module.exports = db;
