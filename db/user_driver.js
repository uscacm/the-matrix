var crypto = require('crypto');
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
        if (err) callback(err);
        else if (user.length > 1) {
          callback({
            error: 'More than one user', 
            errorcode: 1 
          });
        } else if (user.length === 0) {
          callback({
            error: 'No user found',
            errorcode: 2
          });
        } else {
          callback(null, user);
        }
      });
    }
  });
};

UserDriver.prototype.findByUserHash = function(hash, callback) {
  this.getCollection(function(err, user_collection) {
    if (err) callback(err);
    else {
      user_collection.find({'hash': hash}).toArray(function(err, user) {
        if (err) callback(err);
        else if (user.length > 1) callback({error: 'more than one user.'});
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
      var hash = crypto.createHmac('sha1', config.user_salt)
                       .update(user.usc_id).digest('hex');
      user.hash = hash;
      user_collection.insert(user, function() {
        callback(null, user);
      });
    }
  });
};

UserDriver.prototype.update = function(user, callback) {
  this.getCollection(function(err, user_collection) {
    if (err) callback(err);
    else {
      user.updated_at = new Date();
      user_collection.find({'usc_id': user.usc_id}).toArray(function(err, doc) {
        user._id = doc[0]._id;
        var hash = crypto.createHmac('sha1', config.user_salt)
                         .update(user.usc_id).digest('hex');
        user.hash = hash;

        user_collection.save(user, function(error, doc) {
          if (error) callback(error);
          else callback(null, doc);
        });
      });
    }
  });
};

exports.UserDriver = UserDriver;
