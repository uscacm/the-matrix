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
        else if (event.length > 1) callback({error: 'more than one event'});
        else if 
      });
    }
  });
};

EventDriver.prototype.save = function(event, callback) {
  this.getCollection(function(err, event_collection) {
    if (err) callback(err);
    else {

    }
  });
};

exports.EventDriver = EventDriver;
