var express = require('express');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())	return next();
	res.redirect('/');
}

module.exports = function(app, passport){

	// root /home (no authentication needed) 
	app.use('/', require('./routes/home')(passport, isAuthenticated));
	
	// user/login / user/register / user/logout
	app.use('/user', require('./routes/user.profile')(passport, isAuthenticated));
	
	// user/login / user/register / user/logout
	//app.use('/api/user', require('./routes/apiUser')(passport, isAuthenticated));	
	
}
