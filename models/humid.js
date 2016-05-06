/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Humid = sequelize.define("Humid", {
    value: DataTypes.STRING
  }

  );

  return Humid;
};
