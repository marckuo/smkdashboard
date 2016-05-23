var express = require('express');
var router = express.Router();
var models  = require('../models');
var getModel = require('../helpers/getSensorModel');

router.get('/last/:sensor_name', function(req, res) {
  var today = new Date();
  var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
  var sensor_name = req.params.sensor_name;
  var time = req.params.time;
  var model = getModel(sensor_name);
  console.log(model);
  console.log('-----------test----------');
  //////////////////////////////////////////////////////
  model.scope('last_day')
    .findAll()
    .then(function(result){
      res.json(result)
    });
  //////////////////////////////////////////////////////
  // console.log(model.last_day())
  // res.json(model.last_day());
  console.log('-----------test----------');
  //
  // if(time === undefined && model !== undefined){
  //   if(sensor_name === 'temp' || sensor_name === 'humid'){
  //     model.findOne(
  //       { order: 'id DESC' }
  //     )
  //     .then(function(temp, metadata) {
  //       res.json(temp);
  //     });
  //   } else if (sensor_name === 'door' || sensor_name === 'beverage') {
  //     model.count({
  //       where: {
  //         createdAt: {
  //           $gt: startDate,
  //           $lt: endDate
  //         }
  //       }
  //     })
  //     .then(function(door_num, metadata){
  //       res.json(door_num);
  //     });
  //   }
  // }
});

router.get('/all/:sensor_name', function(req, res) {
  var today = new Date();
  var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
  var sensor_name = req.params.sensor_name;

  switch(sensor_name) {
    case 'temp':
      models.Temp.findAll()
      .then(function(temp, metadata) {
        res.json(temp);
      });
      break;
    case 'humid':
      models.Humid.findAll()
      .then(function(humid, metadata) {
        res.json(humid);
      });
      break;
    case 'door':
      models.Door.findAll()
      .then(function(door_num, metadata){
        res.json(door_num);
      });
      break;
    case 'beverage':
      models.Beverage.findAll()
      .then(function(beverage_num, metadata){
        res.json(beverage_num);
      });
      break;
  }
});

router.post('/new', function(req, res) {
  var sensor_name = req.body.sensor_name;
  var value = req.body.value;

  switch(sensor_name){
    case 'temp':
      models.Temp.create({value: value}, {fields: ['value']})
        .then(
          function(temp){}
        );
      break;
    case 'humid':
      models.Humid.create({value: value}, {fields: ['value']})
      .then(
        function(humid){}
      );
      break;
    case 'door':
      models.Door.create({value: value}, {fields: ['value']})
      .then(
        function(door){}
      );
      break;
    case 'beverage':
      models.Beverage.create({value: value}, {fields: ['value']})
      .then(
        function(beverage){}
      );
      break;
  }

  res.json({message: '200'});
});


module.exports = router;
