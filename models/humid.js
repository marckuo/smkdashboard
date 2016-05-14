/* jshint node: true */
"use strict";
var io = require('socket.io');

module.exports = function(sequelize, DataTypes) {
  var Humid = sequelize.define("Humid", {
    value: DataTypes.STRING
},{
    hooks: {
      afterCreate: function(humid, options){
        //var socket = io();
        console.log('THE VALUE INSIDE THE HOOK IS: ' + humid.value);
        if(global.SOCKET !== undefined){
          global.SOCKET.broadcast.emit('humid', humid.value);
        }
        console.log('THE HOOK HAPPENED');
      }
    }
  });
  return Humid;
};	
