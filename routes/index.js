var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/test', function(req, res, next){
  res.render('example_test_audio');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  //     console.log("enters get function");
  // models.sequelize.query(
  //   `SELECT *
  //    FROM "Temps"
  //    ORDER BY id DESC
  //    LIMIT 1;
  //   `
  // )
  // .then(function(temp, metadata) {
  //   res.render('index', { title: 'Express',
  //                         temp: temp[0][0].value}
  //                         );
  // });
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


// router.get('/api/door/last', function(req, res) {
//   models.sequelize.query(
//     `SELECT *
//      FROM "Door"
//      ORDER BY id DESC
//      LIMIT 1;
//     `
//   )
//   .then(function(door, metadata) {
//     res.json(door[0][0]);
//   });
// })



router.post('/api/temp', function(req, res) {
  var temp = req.body.temp;
  var humid = req.body.humid;

  models.Temp.create({value: temp}, {fields: ['value']}).then(function(temp){
    // console.log(temp.get({
    //   plain: true
    // }));
  });

  models.Humid.create({value: humid}, {fields: ['value']}).then(function(humid){
    // console.log(humid.get({
    //   plain: true
    // }));
  });

  //console.log(temp);
  res.json({message: '200'});
});

router.post('/api/door', function(req, res, next) {
  var value = req.body.value;

  models.Door.create({value: value}).then(function(door){
  });

  res.json({message: '200'});

});

module.exports = router;
