/* jshint node: true */
"use strict";
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Temp = sequelize.define("Temp", {
    value: DataTypes.STRING
  },{
    hooks: {
      afterCreate: function(temp, options){
        console.log('THE VALUE INSIDE THE HOOK IS: ' + temp.value);

        //if(global.SOCKET !== undefined){
          var socket = io(global.APP_URL);
          socket.emit('temp', temp.value);
        //}
        console.log('THE HOOK HAPPENED');
      }
    }
  });

  return Temp;
};
