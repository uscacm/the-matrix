var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('checkin', { title: 'Check In' });
});

// TODO(ruyan)
router.post('/action', function(req, res) {
  var user_driver = req.user_driver;
  var userID;

  if (req.body['card-scan'] && 
      req.body['card-scan'].match(/^ *$/) === null && 
      req.body['card-scan'] !== "") { 
    // CARD SCANNER ENTRY

    // Capture card scanner data
    var pattern = /w*\+([0-9]{10})w*/;
    var match = pattern.exec(req.body['card-scan']);
    userID = match[1];

    if (match === null) {
      res.sendStatus(500);
    }
  } else { 
    // MANUAL ENTRY
    userID = req.body['usc-id'];
  }

  var err;
  user_driver.findByUSCID(userID, function(err, users) {
  if (err === null) {
    res.send({'id': users[0]['usc_id'], 'fname': users[0]['first_name'], 'error': 0});
  } else {
    //TODO(ruyan): error cases
    res.send({'error': err.errorcode});
  }
  });
});

router.get('/paid', function(req, res) {
  res.render('checkin', { title: 'Check In' });
});


module.exports = router;