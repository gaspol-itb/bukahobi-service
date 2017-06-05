var assert = require('assert-plus');

var GroupService = require('../services/group');

module.exports = function (app) {
	var groupService = new GroupService(app.mongoConnection);

	app.post('/group', function (req, res) {

	});

	app.get('/group', function (req, res) {
		
	});

	app.patch('/group', function (req, res) {
		
	});

	app.delete('/group', function (req, res) {
		
	});
};