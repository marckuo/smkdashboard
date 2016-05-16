var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/test', function(req, res, next){
  res.render('audio_p5_test');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ title: 'Express' });
});

router.get('/api/temp/last', function(req, res) {
  models.sequelize.query(
    `SELECT * FROM "Temps" ORDER BY id DESC LIMIT 1;`
  )
  .then(function(temp, metadata) {
    res.json(temp[0][0]);
  });
});

router.get('/api/humid/last', function(req, res) {
  models.sequelize.query(
    `SELECT * FROM "Humids" ORDER BY id DESC LIMIT 1;`
  )
  .then(function(humid, metadata) {
    res.json(humid[0][0]);
  });
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
