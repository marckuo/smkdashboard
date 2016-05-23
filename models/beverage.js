/* jshint node: true */
'use strict';
var io = require('socket.io-client');

module.exports = function(sequelize, DataTypes) {
  var Beverage = sequelize.define('Beverage', {
    value: DataTypes.BOOLEAN
  },
  {
    scopes: {
      days: function(dates){
        return {
          where: {
            createdAt: {
              $gt: dates.startDate,
              $lt: dates.endDate
            }
          },
          attributes: ['createdAt', 'value'],
          raw: true
        }
      }
    },
    hooks: {
      afterCreate: function(beverage, options){
        var today = new Date();
        var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
        this.count({
          where: {
            createdAt: {
              $gt: startDate,
              $lt: endDate
            }
          }
        })
        .then(function(beverage_num, metadata){
            var socket = io(global.APP_URL);
            socket.emit('beverage', beverage_num);
          }
        );
      }
    }
  }
);
  return Beverage;
};
    //////////////////////////////////////////////////////
   //
  //  classMethods: {
  //    last_day: function(){
  //       var time_arr = [];
  //       var today = new Date();
  //       var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  //       for(var i = 0; i < 24; i++){
  //         var startDate = new Date(endDate - 60 * 60 * 1000);
  //         time_arr.push({
  //           startDate: startDate,
  //           endDate: endDate
  //         });
  //         endDate = startDate;
  //       }
   //
  //       var result_arr = [];
  //       var return_value;
  //       this.scope('last_day')
  //         .findAll({
  //           where: {
  //             createdAt: {
  //               $gt: time_arr[23].startDate,
  //               $lt: time_arr[0].endDate
  //             }
  //           },
  //           attributes: ['createdAt'],
  //           raw: true
  //         })
  //         .then(function(result){
  //             console.log('-----------------');
  //             console.log(result);
  //             return_value =  result
  //         });
  //         return return_value;
  //       // var model = this;
  //       //
  //       // var fillArray = new Promise(
  //       //   function(resolve, reject){
  //       //     console.log('-----------inside promise----------')
  //           //
  //           // for(var j = 0; j < time_arr.length; ){
  //           //   console.log('------inside for loop--------')
  //           //   var time_slice = time_arr[j];
  //           //     model.count({
  //           //       where: {
  //           //         createdAt: {
  //           //           $gt: time_slice.startDate,
  //           //           $lt: time_slice.endDate
  //           //         }
  //           //       }
  //           //     })
  //           //     .then(function(result){
  //           //       result_arr.push(result);
  //           //       j++;
  //           //     });
  //           // }
  //       //     console.log('result---')
  //       //     console.log(result_arr)
  //       //     resolve(result_arr);
  //       //   }
  //       // );
  //       //
  //       // fillArray.then(function(result_arr){
  //       //     console.log('-------inside then---------')
  //       //     return result_arr;
  //       //   });
   //
  //     }
  //   },
