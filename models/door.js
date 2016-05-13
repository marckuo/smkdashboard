'use strict';
var io = require('socket.io');

module.exports = function(sequelize, DataTypes) {
  var Door = sequelize.define('Door', {
    value: DataTypes.BOOLEAN
  }, {
     hooks: {
      afterCreate: function(door, options){
        //var socket = io();
        
        
        console.log('THE VALUE INSIDE THE HOOK IS: ' + door.value);
        if(global.SOCKET !== undefined){
          global.SOCKET.broadcast.emit('door', door.value);
        }
        console.log('THE HOOK HAPPENED');
      }
    }
  });
  return Door;
};