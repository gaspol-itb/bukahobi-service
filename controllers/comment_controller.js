var assert = require('assert-plus');

var CommentService = require('../services/comment');

module.exports = function (app) {
	var commentService = new CommentService(app.mongoConnection);

	app.post('/comment', function (req, res) {

	});

	app.get('/comment', function (req, res) {
		
	});

	app.patch('/comment', function (req, res) {
		
	});

	app.delete('/comment', function (req, res) {
		
	});
};