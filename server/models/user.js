
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: {type: Array, required: false},
	firstName: String,
	lastName: String,
	language: { type: String, default: 'english' },
	dateRegistration: { type: Date, default: Date.now }
});
