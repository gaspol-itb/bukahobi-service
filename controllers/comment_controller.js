var expressValidation = require('express-validation');

var CommentService = require('../services/comment');

module.exports = function (app) {
	var commentService = new CommentService(app.mongoConnection);

	app.post('/comment', function (req, res) {
		expressValidation({
            body: {
                event_id: Joi.string().required(),
                user_id: Joi.string().required(),
                text: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	var commentData = {
        		event_id: req.body.event_id,
        		user_id: req.body.user_id,
        		text: req.body.text
        	};

        	commentService.createComment(commentData, function (err, comment) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = comment;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});

	app.get('/comment/event_id=:event_id', function (req, res) {
		expressValidation({
            params: {
                event_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	commentService.getCommentsByEventId(req.params.event_id, function (err, comments) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = comments;
        	});
        },
        function (req, res) {
        	res.status(200).json(res.locals.response_data);
        }
	});

    app.get('/comment/:comment_id', function (req, res) {
        expressValidation({
            params: {
                comment_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
            commentService.getCommentById(req.params.comment_id, function (err, comment) {
                if (err) {
                    return next(err);   
                }

                res.locals.response_data = comment;
            });
        },
        function (req, res) {
            res.status(200).send(res.locals.response_data);
        }
    });

	app.patch('/comment/:comment_id', function (req, res) {
		expressValidation({
            body: {
                text: Joi.string().required()
            },
            params: {
            	comment_id: Joi.string().required()
            }
        }),
        function (req, res, next) {
        	var commentData = {
        		text: req.body.text
        	};

        	commentService.updateComment(req.params.comment_id, commentData, function (err, updatedComment) {
        		if (err) {
        			return next(err);	
        		}

        		res.locals.response_data = updatedComment;
        	});
        },
        function (req, res) {
        	res.status(200).send(res.locals.response_data);
        }
	});
};