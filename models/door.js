'use strict';
module.exports = function(sequelize, DataTypes) {
  var Door = sequelize.define('Door', {
    value: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Door;
};