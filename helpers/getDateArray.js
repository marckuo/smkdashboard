var models  = require('../models');
var _ = require('lodash');
var moment = require('moment');
module.exports = function(model, time_frame, callback) {
  var time_arr = [];
  var time_bin;

  if(time_frame === 'day'){
    time_bin = 'hours';
    time_arr = getTimeArr(24, time_bin);
  } else if (time_frame === 'week') {
    time_bin = 'days';
    time_arr = getTimeArr(7, time_bin);
  } else if (time_frame === 'month') {
    time_bin = 'days';
    time_arr = getTimeArr(moment().daysInMonth(), time_bin);
  }

  var return_arr = _.fill(Array(time_arr.length), 0);

  model.scope({ method: ['days', { startDate: time_arr[0].toDate() , endDate: _.last(time_arr).add(1, time_bin).toDate()}]})
    .findAll()
    .then(function(result){
      console.log('------------inside then')
      console.log(result);
      var timestamps = result.map(function(obj){ return [obj.createdAt, obj.value] });
      for(var j = 0; j < time_arr.length; j++){
        var valueArr = [];
        timestamps.map(function(obj){
          var time = obj[0];
          var value = obj[1];
          if(moment(time).isSame(time_arr[j], time_bin)){
            if(model.name === 'Beverage' || model.name === 'Door'){
              return_arr[j] += 1;
            } else {
              valueArr.push(value);
            }
          }
        });
        console.log(valueArr)
        return_arr[j] = valueArr.length <= 0 ? 0 : Math.round(_.mean(valueArr)  * 10) / 10;
      }
      callback(return_arr);
    });
}

function getTimeArr(numDays, time_bin){
  var time_arr = [];
  for(var i = 0; i < numDays; i++){
    //console.log(today.subtract(1, 'days').toDate());
    time_arr.push(moment(0, 'HH').add(1,time_bin).subtract(1,'ms').subtract(i, time_bin));
    //console.log('today: ' + today.toDate())
  }
  //  console.log(time_arr)//.map(function(obj){ obj.toDate() }))
  console.log(time_arr.map(function(o){return o.toDate()}))
  return time_arr.reverse();
}
