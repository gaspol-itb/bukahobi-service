'use strict'
var assert = require('assert-plus');

function Funding (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Funding: this.mongoConnection.model('Funding', require('./models/funding'))
	};
};