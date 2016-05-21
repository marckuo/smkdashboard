/* jshint node: true */
"use strict";
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    rfidKey: {type: DataTypes.STRING, unique: true},
    signedIn: DataTypes.BOOLEAN
  });

  return Member;
};
