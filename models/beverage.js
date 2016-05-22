/* jshint node: true */
'use strict';
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Beverage = sequelize.define('Beverage', {
    value: DataTypes.BOOLEAN
  }, {

    hooks: {
      afterCreate: function(beverage, options){
        var today = new Date();
        var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
        Beverage.count({
          where: {
            createdAt: {
              $gt: startDate,
              $lt: endDate
            }
          }
        })
        .then(function(beverage_num, metadata){
            var socket = io(global.APP_URL);
            socket.emit('beverage', beverage_num);
          }
        );
      }

    }
  });
  return Beverage;
};
