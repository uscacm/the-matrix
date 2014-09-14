var config = require('./../config');

EventDriver = function(db) {
  this.db = db;
};

EventDriver.prototype.getCollection = function(callback) {
  this.db.collection(config.event_collection, function(err, event_collection) {
    if (err) callback(err);
    else callback(null, event_collection);
  });
};

EventDriver.prototype.findAll = function(callback) {
  this.getCollection(function(err, event_collection) {
    if (err) callback(err);
    else {
      event_collection.find().toArray(function(error, results) {
        if (error) callback(error);
        else callback(null, results);
      });
    }
  });
};

EventDriver.prototype.findByEventID = function(event_id, callback) {
  this.getCollection(function(err, event_collection) {
    if (err) callback(err);
    else {
      event_collection.find({'event_id': event_id}).toArray(function(error, event) {
        if (error) callback(error);
        else if (event.length > 1) {
          callback({
            error: 'More than one event',
            errorcode: 3
          });
        } else if (event.length === 0) {
          callback({
            error: 'No event found',
            errorcode: 4
          });
        } else callback(null, event);
      });
    }
  });
};

EventDriver.prototype.save = function(event, callback) {
  this.getCollection(function(err, event_collection) {
    if (err) callback(err);
    else {
      event.created_at = new Date();
      event.users = [];
      event_collection.insert(event, function() {
        callback(null, event);
      });
    }
  });
};

// obj = {usc_id: #10_digits#, event_id: #6_digits#}
EventDriver.prototype.addUserToEvent = function(obj, callback) {
  this.getCollection(function(err, event_collection) {
    if (err) callback(err);
    else {
      event_collection.find({event_id: obj.event_id}).toArray(function(err, event) {
        event.users.push(obj.usc_id);
        event_collection.save(event, function(error, doc) {
          if (error) callback(error);
          else callback(null, doc);
        });
      });
    }
  });
};

exports.EventDriver = EventDriver;
