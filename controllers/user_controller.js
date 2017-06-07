var expressValidation = require('express-validation');

var UserService = require('../services/user');

module.exports = function (app) {
	var userService = new UserService(app.mongoConnection);

	app.post('/user', function (req, res) {
        function (req, res, next) {
        	userService.createUser( function (err, user) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = user;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});

	app.post('/login', function (req, res) {
		expressValidation({
            body: {
                username: Joi.string().required(),
                password: Joi.string().required()
            }
        }),
        function (req, res, next) {
            var loginData = {
                username: req.body.username,
                password: req.body.password
            };

            userService.login(loginData, function (err, user) {
                if (err) {
                    return next(err);   
                }

                res.locals.response_data = user;
            });
        },
        function (req, res) {
            res.status(200).send(res.locals.response_data);
        }
	});
};