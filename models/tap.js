/* jshint node: true */
"use strict";
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Tap = sequelize.define("Tap", {
    value: DataTypes.STRING,
    member_id:
    {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Members",
        key: "id"
      }
    }
  });

  return Tap;
};
