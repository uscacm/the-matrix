var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/list_users', function(req, res) {
  var user_driver = req.user_driver;
  user_driver.findAll(function(err, users) {
    if (err) {
      res.send(400, err);
    } else {
      if (req.accepts('html')) {
        res.render('test_listing', {objects: users, collection: 'User Listing'});
      } else {
        res.set('Content-Type', 'application/json');
        res.send(200, users);
      }
    }
  });
});

module.exports = router;
