'use strict'
var assert = require('assert-plus');

function Event (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Group: this.mongoConnection.model('Event', require('./models/event'))
	};
};