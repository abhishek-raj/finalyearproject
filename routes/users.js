var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* users routes */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'User Signup'});
});

router.post('/signup', function(req, res, next) {
	
	var body = req.body;

	User.findOne({uname: body.uname}, function(err, user) {
		if(err) return res.send('Some error ocurred');

		if(user) {
			return res.send('That username already exists.');
		} else {
			var newUser = new User({
				uname: body.uname,
				password: body.password
			});

			newUser.save(function(err) {
				if(err) return res.send('Some error ocurred');

				return res.send('User successfully signed up.');
			})
		}
	})
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'User Signin test'});
});

router.post('/signin', function(req, res, next) {
	
	var body = req.body;

	User.findOne({uname: body.uname, password: body.password}, function(err, user) {
		if(err) return res.send('Some error ocurred');

		if(user) {
			return res.send('Signed in successfully.');
		} else {
			return res.send('Invalid credentials.');
		}
	})
});

module.exports = router;
