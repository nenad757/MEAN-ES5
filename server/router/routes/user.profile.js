var express = require('express');
var router = express.Router();

module.exports = function (passport, isAuthenticated) {

	/* GET /user/  */
	router.get('/', function(req, res) {
		res.render('user/login', { message: req.flash('message') });
	});

	/* GET /user/login/ (same as GET /user/) */
	router.get('/login', function(req, res) {
		res.render('user/login', { message: req.flash('message') });
	});

	/* POST /user/login/ */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/user',
		failureFlash : true  
	}));

	/* GET /user/register/ */
	router.get('/register', function(req, res){
		res.render('user/register',{ message: req.flash('message') });
	});

	/* POST /user/register/ */
	router.post('/register', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/user/register',
		failureFlash : true  
	}));

	/* GET /user/logout/ */
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	return router;
}
