/* jshint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Coffee = sequelize.define("coffee", {
    value: DataTypes.BOOLEAN

  });

  return Coffee;
};
