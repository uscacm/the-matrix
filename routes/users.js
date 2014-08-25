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
  var grad_student = req.body.grad_student;  // TODO: align with frontend.
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
      res.send(res);
    } else {
      res.location('list_users');
      res.redirect('list_users');
    }
  });
});

router.get('/update/:usc_id(\\d+)', function (req, res) {
  res.render('test_update_user');
});

router.post('/update', function(req, res) {
  var user_driver = req.user_driver;

  // Get user information
  var usc_id = req.body.usc_id;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var grad_year = req.body.grad_year;
  var grad_student = req.body.grad_student;  // TODO: align with frontend.
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

  user_driver.update(user, function(err, doc) {
    if (err) {
      res.send(res);
    } else {
      res.location('list_users');
      res.redirect('list_users');
    }
  });
});

router.get('/:usc_id(\\d+)', function(req, res) {
  var user_driver = req.user_driver;

  user_driver.findByUSCID(req.params.usc_id, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.render('test_user', {user_object: user});
    }
  });
});

router.get('/:hash([0-9a-fA-F]{40})', function(req, res) {
  var user_driver = req.user_driver;

  user_driver.findByUserHash(req.params.hash, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.render('test_user', {user_object: user});
    }
  });
});

module.exports = router;
