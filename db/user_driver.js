var config = require('./../config');

UserDriver = function(db) {
  this.db = db;
};

UserDriver.prototype.getCollection = function(callback) {
  this.db.collection(config.user_collection, function(err, user_collection) {
    if (err) callback(err);
    else callback(null, user_collection);
  });
};

UserDriver.prototype.findAll = function(callback) {
  this.getCollection(function(err, user_collection) {
    if (err) callback(err);
    else {
      user_collection.find().toArray(function(err, results) {
        if (err) callback(err);
        else callback(null, results);
      });
    }
  });
};

UserDriver.prototype.save = function(user, callback) {
  this.getCollection(function(err, user_collection) {
    if (err) callback(err);
    else {
      user.created_at = new Date();
      // TODO(jjw1707) Generation of hashed link

      user_collection.insert(user, function() {
        callback(null, user);
      });
    }
  });
};

exports.UserDriver = UserDriver;
