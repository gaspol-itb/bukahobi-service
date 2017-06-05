'use strict'
var assert = require('assert-plus');

function User (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		User: this.mongoConnection.model('User', require('./models/user'))
	};
};