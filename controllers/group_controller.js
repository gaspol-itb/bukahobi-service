var expressValidation = require('express-validation');

var GroupService = require('../services/group');

module.exports = function (app) {
	var groupService = new GroupService(app.mongoConnection);

	app.post('/group', function (req, res) {
		expressValidation({
            body: {
                user_id: Joi.string().required(),
                text: Joi.string().required(),
                image: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	var groupData = {
        		user_id: req.body.user_id,
        		text: req.body.text,
        		image: req.body.image
        	};

        	groupService.createGroup(groupData, function (err, group) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = group;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});

	app.get('/group/user_id=:user_id', function (req, res) {
		expressValidation({
            params: {
                user_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	groupService.getGroupsByUserId(req.params.user_id, function (err, groups) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = groups;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});

    app.get('/suggested_group/user_id=:user_id', function (req, res) {
        expressValidation({
            params: {
                user_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
            groupService.getSuggestedGroupsByUserId(req.params.user_id, function (err, groups) {
                if (err) {
                    return next(err);   
                }

                res.locals.response_data = groups;
            });
        },
        function (req, res) {
            res.status(200).send(res.locals.response_data);
        }
    });

    app.get('/nearby_group/user_id=:user_id', function (req, res) {
        expressValidation({
            params: {
                user_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
            groupService.getNearbyGroupsByUserId(req.params.user_id, function (err, groups) {
                if (err) {
                    return next(err);   
                }

                res.locals.response_data = groups;
            });
        },
        function (req, res) {
            res.status(200).send(res.locals.response_data);
        }
    });

	app.patch('/group/:group_id', function (req, res) {
		expressValidation({
            body: {
                text: Joi.string().required(),
                image: Joi.string().required()
            },
            params: {
            	group_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	var groupData = {
        		text: req.body.text,
        		image: req.body.image
        	};

        	groupService.updateGroup(req.params.group_id, groupData, function (err, updatedGroup) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = updatedGroup;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});
};