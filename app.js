var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var UserController = require('./controllers/user_controller');
var GroupController = require('./controllers/group_controller');
var EventController = require('./controllers/event_controller');
var CommentController = require('./controllers/comment_controller');
var FundingController = require('./controllers/funding_controller');

var userController = new UserController(app);
var groupController = new GroupController(app);
var eventController = new EventController(app);
var commentController = new CommentController(app);
var fundingController = new FundingController(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(8080);