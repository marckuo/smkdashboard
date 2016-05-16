'use strict';
module.exports = function(sequelize, DataTypes) {
  var Compass = sequelize.define('Compass', {
    value: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Compass;
};