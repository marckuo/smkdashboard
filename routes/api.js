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

router.post('/api/new/:sensor', function(req, res) {
  var sensor_name = req.params.sensor_name;
  var temp = req.body.temp;
  var humid = req.body.humid;

  models.Temp.create({value: temp}, {fields: ['value']}).then(function(temp){
  });

  models.Humid.create({value: humid}, {fields: ['value']}).then(function(humid){
  });

  res.json({message: '200'});
});

router.post('/api/door', function(req, res, next) {
  var value = req.body.value;

  models.Door.create({value: value}).then(function(door){
  });

  res.json({message: '200'});

});

router.post('/api/beverage', function(req, res, next) {
  var value = req.body.value;

  models.Beverage.create({value: value}).then(function(beverage){
  });

  res.json({message: '200'});

});

module.exports = router;
