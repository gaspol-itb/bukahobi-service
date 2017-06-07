var expressValidation = require('express-validation');

var FundingService = require('../services/funding');

module.exports = function (app) {
	var fundingService = new FundingService(app.mongoConnection);

	app.post('/funding', function (req, res) {

	});

	app.get('/funding', function (req, res) {
		
	});

	app.patch('/funding', function (req, res) {
		
	});

	app.delete('/funding', function (req, res) {
		
	});
};