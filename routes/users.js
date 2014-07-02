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

router.get('/new', function(req, res) {
  res.render('test_new_user');
});

router.post('/add', function(req, res) {
  var user_driver = req.user_driver;

  // Get user information
  var usc_id = req.body.usc_id;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var grad_year = req.body.grad_year;
  var grad_student = req.body.grad_student;
  var email = req.body.email;
  var major = req.body.major;

  var user = {
    "usc_id": usc_id,
    "first_name": first_name,
    "last_name": last_name,
    "graduation_year": grad_year,
    "grad_student": grad_student,
    "email": email,
    "major": major
  };

  user_driver.save(user, function(err, doc) {
    if (err) {
      res.send("ERROR");
    } else {
      res.location('list_users');
      res.redirect('list_users');
    }
  });
});

module.exports = router;
