var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('checkin', { title: 'Express' });
});

// TODO(ruyan)
router.post('/action', function(req, res) {
  var user_driver = req.user_driver;

  // If the card scan has an actual entry.
  if (req.body['card-scan'] && 
      req.body['card-scan'].match(/^ *$/) === null && 
      req.body['card-scan'] !== "") {
    var pattern = /w*\+([0-9]{10})w*/;
    // console.log(req.body['card-scan']);
    var match = pattern.exec(req.body['card-scan']);

    if (match === null) {
      res.sendStatus(500);
    } else {
      var err;
      user_driver.findByUSCID(match[1], function(err, users) {
        console.log(users);
        if (err === null) {
          res.send({'id': users[0]['usc_id'], 'fname': users[0]['first_name']});
        } else {
          //TODO(ruyan): error cases
          res.send({'id': 00000000000});
        }
      });
    }
  } else {
    var log = fs.createWriteStream('message.txt', {'flags': 'a'});
    // use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
    log.write(req.body['usc-id']);
    log.write('\n');

    res.send({'id': req.body['usc-id']});
  }
});

module.exports = router;