/* jshint node: true */
"use strict";
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Temp = sequelize.define("Temp", {
    value: DataTypes.STRING
  },{
    hooks: {
      afterCreate: function(temp, options){
        var socket = io(global.APP_URL);
        socket.emit('temp', temp.value);
      }
    }
  });

  return Temp;
};
