'use strict'
var assert = require('assert-plus');

function UserService (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		User: this.mongoConnection.model('User', require('./models/user'))
	};
};

UserService.prototype.createUser = function (callback) {
	this.models.User.create( function (err, user) {
		if (err) {
			return callback(err);
		}

		callback(null, user.toJSON());
	});
};

UserService.prototype.login = function (loginData, callback) {
	assert.object(loginData);
	assert.string(loginData.username);
	assert.string(loginData.password);

	
};

module.exports = UserService;