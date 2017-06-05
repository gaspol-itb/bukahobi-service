var assert = require('assert-plus');

var UserService = require('../services/user');

module.exports = function (app) {
	var userService = new UserService(app.mongoConnection);

	app.post('/user', function (req, res) {

	});

	app.get('/user', function (req, res) {
		
	});

	app.patch('/user', function (req, res) {
		
	});

	app.delete('/user', function (req, res) {
		
	});
};