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

UserDriver.prototype.findByUSCID = function(usc_id, callback) {
  this.getCollection(function(err, user_collection) {
    if (err) callback(err);
    else {
      user_collection.find({'usc_id': usc_id}).toArray(function(err, user) {
        console.log('output:');
        console.log(user);
        if (err) callback(err);
        else if (user.length > 1) callback({error: 'more than one user'});
        else if (user.length === 0) callback({error: 'no user found'});
        else callback(null, user);
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
