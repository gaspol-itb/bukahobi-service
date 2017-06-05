var assert = require('assert-plus');

var EventService = require('../services/event');

module.exports = function (app) {
	var eventService = new EventService(app.mongoConnection);

	app.post('/event', function (req, res) {

	});

	app.get('/event', function (req, res) {
		
	});

	app.patch('/event', function (req, res) {
		
	});

	app.delete('/event', function (req, res) {
		
	});
};