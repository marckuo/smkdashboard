/* jshint node: true */
"use strict";
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Temp = sequelize.define("Temp", {
    value: DataTypes.STRING
  },{
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
      afterCreate: function(temp, options){
        var socket = io(global.APP_URL);
        socket.emit('temp', temp.value);
      }
    }
  });

  return Temp;
};
