var models  = require('../models');

module.exports = function(model, time_frame, callback) {
  var today = new Date();
  var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  var time_arr = [];

  if(time_frame === 'day'){
    time_arr = getTimeArr(24, 60 * 60 * 1000, endDate);
  } else if (time_frame === 'week') {
    time_arr = getTimeArr(7, 24 * 60 * 60 * 1000, endDate);
  } else if (time_frame === 'month') {
    time_arr = getTimeArr(30, 24 * 60 * 60 * 1000, endDate);
  }
  time_arr.reverse();

  var return_arr = new Array(time_arr.length + 1).join('0').split('').map(parseFloat);

  model.scope({ method: ['days', { startDate: time_arr[0].startDate , endDate: time_arr[time_arr.length - 1].endDate}]})
    .findAll()
    .then(function(result){
      var timestamps = result.map(function(obj){ return [obj.createdAt, obj.value] });
      for(var j = 0; j < time_arr.length; j++){
        var valueArr = [];
        timestamps.map(function(obj){
          var time = obj[0];
          var value = obj[1];
          if(time > time_arr[j].startDate && time < time_arr[j].endDate){
            if(model.name === 'Beverage' || model.name === 'Door'){
              console.log('inside bev/door')
              return_arr[j] += 1;
              console.log(return_arr)
            } else {
              valueArr.push(value);
            }
          }
        });
        if(model.name === 'Temp' || model.name === 'Humid'){
          return_arr[j] = valueArr.length === 0 ? 0 : Math.round(average(valueArr)  * 10) / 10;
        }
      }
      callback(return_arr);
    });
}

function average(arr){
  if(arr.length <= 0){
    return 0;
  }
  var sum = 0;
  for( var i = 0; i < arr.length; i++ ){
    sum += parseInt( arr[i], 10 ); //don't forget to add the base
  }

  return  sum/arr.length;
}

function getTimeArr(numDays, timeSlice, endDate){
  var time_arr = [];
  for(var i = 0; i < numDays; i++){
    var startDate = new Date(endDate - timeSlice);
    time_arr.push({
      startDate: startDate,
      endDate: endDate
    });
    endDate = startDate;
  }
  return time_arr;
}
