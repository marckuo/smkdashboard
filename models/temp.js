/* jshint node: true */
"use strict";
var io = require('socket.io');

module.exports = function(sequelize, DataTypes) {
  var Temp = sequelize.define("Temp", {
    value: DataTypes.STRING
  },{
    hooks: {
      afterCreate: function(temp, options){
        //var socket = io();
        console.log('THE VALUE INSIDE THE HOOK IS: ' + temp.value);
        if(global.SOCKET !== undefined){
          global.SOCKET.emit('temp', temp.value);
        }
        console.log('THE HOOK HAPPENED');
      }
    }
  });

  return Temp;
};
