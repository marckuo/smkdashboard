/* jshint node: true */
"use strict";
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    rfidKey: DataTypes.STRING
  },{
    hooks: {
      afterCreate: function(temp, options){
        var socket = io(global.APP_URL);
        socket.emit('temp', temp.value);
      }
    }
  });

  return Member;
};
