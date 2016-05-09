"use strict";
/* jshint esnext:true, -W110 */

var Sequelize, sequelize, DataTypes, Promise = require('bluebird'), _ = require('lodash'), moment = require('moment');

Sequelize = DataTypes = require('./index.js');
//var db = sequelize = new Sequelize('sequelize', 'root', '', {
var db = sequelize = new Sequelize('sequelize', 'postgres', 'postgres', {
  dialect: 'postgres',
//var db = sequelize = new Sequelize('sequelize-test-72', 'sequelize', 'nEGkLma26gXVHFUAHJxcmsrK', {
//  dialect: 'mssql',
//  host: 'mssql.sequelizejs.com',
//  port: 11433,
//  dialect: 'sqlite',
  define: {
    timestamps: false,
  },
  //logging: console.log
});

let User = sequelize.define('user');


return sequelize.sync({
  force: true,
  logging: console.log
})
  .then(() => User.create())
  .then(user => {
    user.set('id', 42, { raw: true });
    user.changed('id', true);
    return user.save();
  })
  .finally(() => sequelize.close());
