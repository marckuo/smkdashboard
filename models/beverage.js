'use strict';
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
        if(global.SOCKET !== undefined){
          global.SOCKET.broadcast.emit('beverage', beverage[0][0].count);
        }
        
        console.log('THE HOOK HAPPENED');
      }
      )}
    }
  });
  return Beverage;
};