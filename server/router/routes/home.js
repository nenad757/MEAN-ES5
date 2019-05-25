var express = require('express');
var router = express.Router();
//cookie for remember me
//var cookie = require('cookie');


module.exports = function (passport, isAuthenticated) {

	/*  GET / . */
	router.get('/', function(req, res) {
		res.render('index', { message: req.flash('message') });
	});

	/*  GET /home/  */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home/home', { user: req.user });
	});
	

	return router;
}
