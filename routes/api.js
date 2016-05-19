var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res){
  res.json('testing');
});

router.get('/last/:sensor_name', function(req, res) {
  var today = new Date();
  var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  var startDate = new Date(endDate - 24 * 60 * 60 * 1000);
  var sensor_name = req.params.sensor_name;

  switch(sensor_name) {
    case 'temp':
      models.Temp.findOne(
        { order: 'id DESC' }
      )
      .then(function(temp, metadata) {
        res.json(temp);
      });
      break;
    case 'humid':
      models.Humid.findOne(
        { order: 'id DESC' }
      )
      .then(function(humid, metadata) {
        res.json(humid);
      });
      break;
    case 'door':
      models.Door.count({
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
      break;
    case 'beverage':
      models.Beverage.count({
        where: {
          createdAt: {
            $gt: startDate,
            $lt: endDate
          }
        }
      })
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
