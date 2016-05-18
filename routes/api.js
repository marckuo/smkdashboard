var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res){
  res.json('testing');
});

router.get('/last/:sensor_name', function(req, res) {

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
      //get all entries made today
      //get count
      models.Door.count()
      .then(function(door_num, metadata){
        res.json(door_num);
      });
      break;
    case 'coffee':

      break;
  }
});

router.get('/api/door/last', function(req, res) {
  models.sequelize.query(
    `SELECT count(value) FROM "Doors";`
  )
  .then(function(door, metadata) {
    res.json(door[0][0]);
  });
});

router.get('/api/beverage/last', function(req, res) {
  models.sequelize.query(
    `SELECT count(value)
     FROM "Beverages";
    `
  )
  .then(function(beverage, metadata) {
    console.log(beverage)
    res.json(beverage[0][0]);
  });
});

router.post('/api/temp', function(req, res) {
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
