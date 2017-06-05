'use strict'
var assert = require('assert-plus');

function Group (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Group: this.mongoConnection.model('Group', require('./models/group'))
	};
};