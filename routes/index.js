var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/temp', function(req, res) {
  var temp = req.body.temp;
  var humid = req.body.humid;

  models.Temp.create({value: temp}, {fields: ['value']}).then(function(temp){
    console.log(temp.get({
      plain: true
    }));
  });

  console.log('HUMID------------------------------------' + humid);
  models.Humid.create({value: humid}, {fields: ['value']}).then(function(humid){
    console.log(humid.get({
      plain: true
    }));
  });

  //console.log(temp);
  res.json({message: '200'});
});


module.exports = router;
