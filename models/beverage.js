'use strict';
module.exports = function(sequelize, DataTypes) {
  var Beverage = sequelize.define('Beverage', {
    value: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Beverage;
};