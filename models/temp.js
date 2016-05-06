/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Temp = sequelize.define("Temp", {
    value: DataTypes.STRING
  });

  return Temp;
};
