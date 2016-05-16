/* jshint node: true */
'use strict';
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Beverage = sequelize.define('Beverage', {
    value: DataTypes.BOOLEAN
  }, {

    hooks: {
      afterCreate: function(beverage, options){
        sequelize.query(
    `SELECT count(value)
     FROM "Beverages";
    `
  ).then(function(beverage,metadata){
        console.log(beverage,metadata);
        console.log('THE VALUE INSIDE THE HOOK IS: ' + beverage[0][0].count);

        var socket = io(global.APP_URL);
        socket.emit('beverage', beverage[0][0].count);
        console.log('THE HOOK HAPPENED');
      }
      )}

    }
  });
  return Beverage;
};
