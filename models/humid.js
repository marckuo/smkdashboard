/* jshint node: true */
"use strict";
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Humid = sequelize.define("Humid", {
    value: DataTypes.STRING
},{
    hooks: {
      afterCreate: function(humid, options){
        //var socket = io();
        var socket = io(global.APP_URL); 
        console.log('THE VALUE INSIDE THE HOOK IS: ' + humid.value);
        //if(global.SOCKET !== undefined){
          socket.emit('humid', humid.value);
        //}
        console.log('THE HOOK HAPPENED');
      }
    }
  });
  return Humid;
};
