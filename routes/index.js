var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/checkin', function(req, res) {
  res.render('checkin', { title: 'Express' });
});

router.post('/checkin2', function(req, res) {
  var pattern = /w*\+([0-9]{10})w*/;
  var match = pattern.exec(req.body['card-scan']);

  var log = fs.createWriteStream('message.txt', {'flags': 'a'});
  // use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
  log.write(match[1]);
  log.write('\n');

  // console.log(match);
  res.send(match[1]);
});

module.exports = router;