var expressValidation = require('express-validation');

var FundingService = require('../services/funding');

module.exports = function (app) {
	var fundingService = new FundingService(app.mongoConnection);

	app.get('/funding/event_id=:event_id', function (req, res) {
		expressValidation({
            params: {
                event_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	fundingService.getFundingByEventId(req.params.event_id, function (err, fundings) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = fundings;
        	});
        },
        function (req, res) {
        	res.status(200).json(res.locals.response_data);
        }
	});
};