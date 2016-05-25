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
      res.json(result);
    });
});

router.get('/welcome_page', function(req, res, next) {
  var rfidKey = req.query.rfidKey
  res.render('welcome_page', {rfidKey: rfidKey});
  
});

/*router.get('/sign_up', function(req, res, next) {
  var rfidKey = req.query.rfidKey
  res.render('sign_up', {rfidKey: rfidKey});

});*/

router.post('/new', function(req, res, next){
  var test = models.Member.create(
    {
      rfidKey: req.body.rfidKey,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    { fields: ['rfidKey', 'firstName', 'lastName', 'email'] }
  )
  .then(function(response){
    res.json({message: 200});
  })
  .catch(function(error){
    res.json({message: error.errors[0].message});
  });
});

router.post('/tap', function(req, res, next){
  models.Member
    .findOne({ where: { rfidKey: req.body.rfidKey } })
    .then(function(member){
      if(member === null){
        var string = encodeURIComponent(req.body.rfidKey);
        console.log(string)
        res.redirect('sign_up?rfidKey=' + string);

      } else {
        member.signedIn = !member.signedIn;
        member.save();
        models.Tap
          .create(
            {
              member_id: member.id,
              value: member.signedIn
            },
            {fields: ['member_id', 'value']}
          );
        res.json({message: member.signedIn});
      }

    })
    .catch(function(error){
      console.log(error);
      res.json({message: 'wrong'})
    });
});

module.exports = router;
