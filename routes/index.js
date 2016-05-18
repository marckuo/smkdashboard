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

module.exports = router;
