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

exports.EventDriver = EventDriver;
