/* jshint node: true */
'use strict';
var io = require('socket.io');

module.exports = function(sequelize, DataTypes) {
  var Door = sequelize.define('Door', {
    value: DataTypes.BOOLEAN
  }, {

     hooks: {
      afterCreate: function(door, options){
        sequelize.query(
    `SELECT count(value)
     FROM "Doors"
     WHERE createdAt: ;
    `
  ).then(function(door,metadata){
        console.log(door,metadata);
        console.log('THE VALUE INSIDE THE HOOK IS: ' + door[0][0].count);
        if(global.SOCKET !== undefined){
          global.SOCKET.broadcast.emit('door', door[0][0].count);
        }

        console.log('THE HOOK HAPPENED');
      }
      )}
    }
  });
  return Door;
};
