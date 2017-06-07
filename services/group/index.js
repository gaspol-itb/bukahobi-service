'use strict'
var assert = require('assert-plus');

function GroupService (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Group: this.mongoConnection.model('Group', require('./models/group'))
	};
};

GroupService.prototype.createGroup = function (groupData, callback) {
	assert.object(groupData);
	assert.string(groupData.event_id);
	assert.string(groupData.user_id);
	assert.string(groupData.text);

	this.models.Group.create(groupData, function (err, group) {
		if (err) {
			return callback(err);
		}

		callback(null, group.toJSON());
	});
};

GroupService.prototype.getGroupsByUserId = function (userId, callback) {
	assert.string(userId);

	this.models.Group.find({ user_id : userId }).exec(function (err, groups) {
		if (err) {
			return callback(err);
		}

		callback(null, groups);
	});
};

GroupService.prototype.getSuggestedGroupsByUserId = function (userId, callback) {
	assert.string(userId);

	this.models.Group.find({ user_id : userId }).exec(function (err, groups) {
		if (err) {
			return callback(err);
		}

		callback(null, groups);
	});
};

GroupService.prototype.getNearbyGroupsByUserId = function (userId, callback) {
	assert.string(userId);

	this.models.Group.find({ user_id : userId }).exec(function (err, groups) {
		if (err) {
			return callback(err);
		}

		callback(null, groups);
	});
};

GroupService.prototype.updateGroup = function (groupId, groupData, callback) {
	assert.string(groupId);
	assert.object(groupData);
	assert.string(groupData.text);

	this.models.Group.findOneAndUpdate({ _id : groupId }, { $set : groupData }, { new : true }, function (err, updatedGroup) {
		if (err) {
			return callback(err);
		}

		callback(null, updatedGroup.toJSON());
	});
};

module.exports = GroupService;