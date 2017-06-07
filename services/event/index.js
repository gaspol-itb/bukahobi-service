'use strict'
var assert = require('assert-plus');

function EventService (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Event: this.mongoConnection.model('Event', require('./models/event'))
	};
};

EventService.prototype.createEvent = function (eventData, callback) {
	assert.object(eventData);
	assert.string(eventData.group_id);
	assert.string(eventData.user_id);
	assert.string(eventData.text);
	assert.bool(eventData.is_function);
	assert.number(eventData.target_amount);

	this.models.Event.create(eventData, function (err, event) {
		if (err) {
			return callback(err);
		}

		callback(null, event.toJSON());
	});
};

EventService.prototype.getEventsByGroupId = function (group_id, callback) {
	assert.string(group_id);

	this.models.Event.find({ group_id : group_id }).exec(function (err, events) {
		if (err) {
			return callback(err);
		}

		callback(null, events);
	});
};

EventService.prototype.getEventById = function (eventId, callback) {
	assert.string(eventId);

	this.models.Event.findOneById({ event_id : eventId }, function (err, event) {
		if (err) {
			return callback(err);
		}

		callback(null, event.toJSON());
	});
};

EventService.prototype.updateEvent = function (eventId, eventData, callback) {
	assert.string(eventId);
	assert.object(eventData);
	assert.string(eventData.text);

	this.models.Comment.findOneAndUpdate({ _id : eventId }, { $set : eventData }, { new : true }, function (err, updatedEvent) {
		if (err) {
			return callback(err);
		}

		callback(null, updatedEvent.toJSON());
	});
};

EventService.prototype.funding = function (eventId, fundingData, callback) {
	assert.string(eventId);
	assert.object(fundingData);
	assert.string(fundingData.user_id);
	assert.number(fundingData.amount);

	this.models.Comment.findOne({ _id : eventId }, function (err, event) {
		if (err) {
			return callback(err);
		}

		var current_amount = fundingData.amount + event.current_amount;

		this.models.Comment.findOneAndUpdate({ _id : eventId }, { $set : { current_amount : current_amount }, { new : true }, function (err, updatedEvent) {
			if (err) {
				return callback (err);
			}
			
			callback(null, updatedEvent.toJSON());
		}});
	});
};

module.exports = EventService;