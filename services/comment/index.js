'use strict'
var assert = require('assert-plus');

function CommentService (mongoConnection) {
	assert.object(mongoConnection);

	this.mongoConnection = mongoConnection;

	this.models = {
		Comment: this.mongoConnection.model('Comment', require('./models/comment'))
	};
};

CommentService.prototype.createComment = function (commentData, callback) {
	assert.object(commentData);
	assert.string(commentData.event_id);
	assert.string(commentData.user_id);
	assert.string(commentData.text);

	this.models.Comment.create(commentData, function (err, comment) {
		if (err) {
			return callback(err);
		}

		callback(null, comment.toJSON());
	});
};

CommentService.prototype.getCommentById = function (commentId, callback) {
	assert.string(commentId);

	this.models.Comment.findOneById(commentId, function (err, comment) {
		if (err) {
			return callback(err);
		}

		callback(null, comment.toJSON());
	});
};

CommentService.prototype.getCommentsByEventId = function (eventId, callback) {
	assert.string(eventId);

	this.models.Comment.find({ event_id : eventId }).exec(function (err, comments) {
		if (err) {
			return callback(err);
		}

		callback(null, comments);
	});
};

CommentService.prototype.updateComment = function (commentId, commentData, callback) {
	assert.string(commentId);
	assert.object(commentData);
	assert.string(commentData.text);

	this.models.Comment.findOneAndUpdate({ _id : commentId }, { $set : commentData }, { new : true }, function (err, updatedComment) {
		if (err) {
			return callback(err);
		}

		callback(null, updateComment.toJSON());
	});
};

module.exports = CommentService;