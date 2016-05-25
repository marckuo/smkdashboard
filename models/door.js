/* jshint node: true */
'use strict';
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Door = sequelize.define('Door', {
    value: DataTypes.BOOLEAN
  },
  {
    scopes: {
      days: function(dates){
        return {
          where: {
            createdAt: {
              $gt: dates.startDate,
              $lt: dates.endDate
            }
          },
          attributes: ['createdAt', 'value'],
          raw: true
        }
      }
    },
     hooks: {
      afterCreate: function(door, options){
        var today = new Date();
        var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
        Door.count({
          where: {
            createdAt: {
              $gt: startDate,
              $lt: endDate
            }
          }
        })
        .then(function(door_num, metadata){
          var socket = io(global.APP_URL);
          socket.emit('door', door_num);
        }
      )}
    }
  });
  return Door;
};
