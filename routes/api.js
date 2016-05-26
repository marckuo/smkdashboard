var express = require('express');
var router = express.Router();
var models  = require('../models');
var getModel = require('../helpers/getSensorModel');
var getDateArray = require('../helpers/getDateArray');

router.get('/signed_in', function(req, res){

  models.Member.count(
    {where: {
      signedIn: true
    }}
  ).then(function(result){
    res.json(result);
  });
});

router.get('/history/:time/:sensor_name', function(req, res){
  var sensor_name = req.params.sensor_name;
  var time = req.params.time;
  var model = getModel(sensor_name);

  if((sensor_name === 'humid' || sensor_name === 'temp') && time === 'day'){
    var today = new Date();
    var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
    model.scope({ method: ['days', { startDate: startDate , endDate: endDate}]})
      .findAll()
      .then(function(result){
        res.json(result.map(function(value, index){
          return {x: index + 1, y: value.value}
        }));
      });
  }else{
    getDateArray(model, time, function(data){
        res.json(data.map(function(value, index){
          return {x: index + 1, y: value}
        }));
    });
  }
});

router.get('/last/:sensor_name', function(req, res) {
  var sensor_name = req.params.sensor_name;
  var model = getModel(sensor_name);

  if(model !== undefined){
    if(sensor_name === 'temp' || sensor_name === 'humid'){
      model.findOne(
        { order: 'id DESC' }
      )
      .then(function(temp) {
        res.json(temp);
      });
    } else if (sensor_name === 'door' || sensor_name === 'beverage') {
      var today = new Date();
      var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
      model.count({
        where: {
          createdAt: {
            $gt: startDate,
            $lt: endDate
          }
        }
      })
      .then(function(door_num, metadata){
        res.json(door_num);
      });
    }
  }
});

router.post('/new', function(req, res) {
  var sensor_name = req.body.sensor_name;
  var value = req.body.value;
  var model = getModel(sensor_name);

  model.create({value: value}, {fields: ['value']})
    .then(function(){
      res.json({message: '200'});
    });


});

module.exports = router;


  // var today = new Date();
  // var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  // var startDate = new Date(endDate - 24 * 60 * 60 * 1000);

  // console.log(model);
  // console.log('-----------test----------');
  //////////////////////////////////////////////////////
  // var time_arr = [];
  // var today = new Date();
  // var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  // var startDate = new Date(endDate - 24 * 60 * 60 * 1000);

  // console.log('----------------***-------------')

  // console.log('----------------***-------------')
  //////////////////////////////////////////////////////
  // console.log(model.last_day())
  // res.json(model.last_day());
  // console.log('-----------test----------');
//-------------------------------------------------------
//
// router.get('/all/:sensor_name', function(req, res) {
//   var today = new Date();
//   var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
//   var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
//   var sensor_name = req.params.sensor_name;
//
//   switch(sensor_name) {
//     case 'temp':
//       models.Temp.findAll()
//       .then(function(temp, metadata) {
//         res.json(temp);
//       });
//       break;
//     case 'humid':
//       models.Humid.findAll()
//       .then(function(humid, metadata) {
//         res.json(humid);
//       });
//       break;
//     case 'door':
//       models.Door.findAll()
//       .then(function(door_num, metadata){
//         res.json(door_num);
//       });
//       break;
//     case 'beverage':
//       models.Beverage.findAll()
//       .then(function(beverage_num, metadata){
//         res.json(beverage_num);
//       });
//       break;
//   }
// });
