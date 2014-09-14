var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('event respond with a resource');
});

router.get('/list_events', function(req, res) {
  var event_driver = req.event_driver;
  event_driver.findAll(function(err, events) {
    if (err) {
      res.send(400, err);
    } else {
      if (req.accepts('htm')) {
        res.render('test_listing', {objects: events, collection: 'Event Listing'});
      } else {
        res.set('Content-Type', 'application/json');
        res.send(200, events);
      }
    }
  });
});

router.get('/new', function(req, res) {
  res.render('test_new_event');
});

router.post('/add', function(req, res) {
  var event_driver = req.event_driver;

  // get event information
  // TODO(Janice): align with frontend
  var event_id = req.body.event_id;
  var event_name = req.body.event_name;
  var paid_member_only = req.body.paid_only;

  // event users array is added in the save.
  var event = {
    "event_id": event_id,
    "name": event_name,
    "paid_member_only": paid_member_only
  };

  event_driver.save(event, function(err, doc) {
    if (err) {
      res.send(res);
    } else {
      res.location('list_events');
      res.redirect('list_events');
    }
  });
});

router.get('/:event_id(\\d{6})', function(req, res) {
  var event_driver = req.event_driver;

  event_driver.findByEventID(req.params.event_id, function(err, event) {
    if (err) {
      res.send(err);
    } else {
      res.render('test_event', {event_object: event});
    }
  });
});

router.post('/add_user', function(req, res) {
  var event_driver = req.event_driver;

  var object = {
    usc_id: req.params.usc_id,
    event_id: req.params.event_id
  };

  event_driver.addUserToEvent(object, function(err, event) {
    if (err) {
      res.send(err);
    } else {
      res.render('test_event', {event_object: event});
    }
  });
});

module.exports = router;
