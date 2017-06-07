var expressValidation = require('express-validation');

var EventService = require('../services/event');

module.exports = function (app) {
	var eventService = new EventService(app.mongoConnection);

	app.post('/event', function (req, res) {
		expressValidation({
            body: {
                group_id: Joi.string().required(),
                user_id: Joi.string().required(),
                text: Joi.string().required(),
                is_funding: Joi.boolean().required()
            }
        }),
        function (req, res, next) {
        	var eventData = {
        		group_id: req.body.group_id,
        		user_id: req.body.user_id,
        		text: req.body.text,
        		is_funding: req.body.is_funding
        	};

        	eventService.createEvent(eventData, function (err, event) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = event;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});

	app.get('/event/group_id=:group_id', function (req, res) {
		expressValidation({
            params: {
                group_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	eventService.getEventsByGroupId(req.params.group_id, function (err, events) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = events;
        	});
        },
        function (req, res) {
        	res.status(200).json(res.locals.response_data);
        }
	});

    app.get('/event/:event_id', function (req, res) {
        expressValidation({
            params: {
                event_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
            eventService.getEventById(req.params.event_id, function (err, event) {
                if (err) {
                    return next(err);   
                }

                res.locals.response_data = event;
            });
        },
        function (req, res) {
            res.status(200).send(res.locals.response_data);
        }
    });

	app.patch('/event/:event_id', function (req, res) {
		expressValidation({
            body: {
                text: Joi.string().required()
            },
            params: {
            	event_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	var eventData = {
        		text: req.body.text
        	};

        	eventService.updateEvent(req.params.event_id, eventData, function (err, updatedEvent) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = updatedEvent;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});
};