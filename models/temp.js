/* jshint node: true */
"use strict";
var io = require('socket.io-client');
var env = process.env.NODE_ENV || 'development';

module.exports = function(sequelize, DataTypes) {
  var Temp = sequelize.define("Temp", {
    value: DataTypes.STRING
  },{
    hooks: {
      afterCreate: function(temp, options){
        if (env === 'development'){
          var socket = io('http://localhost:3000');
        } else {
          var socket = io('https://quiet-castle-31566.herokuapp.com:' + process.env.PORT);
          console.log('development port: ' + process.env.PORT);
        }
        console.log('THE VALUE INSIDE THE HOOK IS: ' + temp.value);
        //if(global.SOCKET !== undefined){
          socket.emit('temp', temp.value);
        //}
        console.log('THE HOOK HAPPENED');
      }
    }
  });

  return Temp;
};
