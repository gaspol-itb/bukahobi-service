'use strict'
var assert = require('assert-plus');

function FundingService (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Funding: this.mongoConnection.model('Funding', require('./models/funding'))
	};
};

FundingService.prototype.createFunding = function (eventId, fundingData, callback) {
	assert.string(eventId);
	assert.object(fundingData);
	assert.string(fundingData.user_id);
	assert.number(fundingData.amount);

	var funding_model_data = {
		event_id : eventId,
		user_id : fundingData.user_id,
		amount : fundingData.amount
	};

	this.models.Funding.create(funding_model_data, function (err, funding) {
		if (err) {
			return callback(err);
		}

		callback(null, funding.toJSON());
	});
};

FundingService.prototype.getFundingByEventId = function (eventId, callback) {
	assert.string(eventId);

	this.models.Funding.find({ event_id : eventId }).exec(function (err, fundings) {
		if (err) {
			return callback(err);
		}

		callback(null, fundings);
	});
};

module.exports = FundingService;