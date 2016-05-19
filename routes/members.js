var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/test', function(req, res, next){
  res.render('audio_p5_test');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Member.findAll()
    .then(function(result){
      console.log(result);
      res.json(result);
    });
});

router.post('/new', function(req, res, next){
  var test = models.Member.create(
    {
      rfidKey: req.body.rfidKey,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    { fields: ['rfidKey', 'firstName', 'lastName'] }
  )
  .then(function(response){
    res.json({message: 200});
  })
  .catch(function(error){
    res.json({message: error.errors[0].message});
  });
});

module.exports = router;
