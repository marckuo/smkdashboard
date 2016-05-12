var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
      console.log("enters get function");
      // res.render('index', { title: 'Express'} );

      // models.Temp.
                        // Temps: Temps});
  models.sequelize.query(
    `SELECT *
     FROM "Temps"
     ORDER BY id DESC
     LIMIT 1;
    `
  )
  .then(function(temp, metadata) {
    res.render('index', { title: 'Express',
                          temp: temp[0][0].value}
                          );
  }
  );
});

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
  console.log(req.query, req.body)
  var value = req.body.value

  models.Door.create({value: value}).then(function(door){
    // console.log(door.get({
    //   plain: true
    // }));
  });

  res.json({message: '200'})

});

module.exports = router;
