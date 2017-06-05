'use strict'
var assert = require('assert-plus');

function Comment (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Group: this.mongoConnection.model('Comment', require('./models/comment'))
	};
};