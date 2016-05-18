/* jshint node: true */
'use strict';
var io = require('socket.io');

module.exports = function(sequelize, DataTypes) {
  var Door = sequelize.define('Door', {
    value: DataTypes.BOOLEAN
  }, {

    classMethods: {
      count: function(){
        return Door.findAll({
        group: [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt'))]
      })
      }
    },
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
