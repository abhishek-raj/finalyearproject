var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Device = require('../models/Device');

/* users routes */
router.get('/update', function(req, res, next) {
  	res.render('device', { title: 'Update Status'});
});

router.post('/update', function(req, res, next) {
	
	var body = req.body;

	User.findOne({uname: body.uname, password: body.password}, function(err, user) {
		if(err) return res.send('Some error ocurred');

		if(user) {
			Device.findOne({dname: body.dname, uname: user.uname}, function(err, device) {
				if(err) return res.send('Some error occured');

				device.status = (body.status === "on") ? true : false;
				device.save(function(err) {
					if(err) return res.send("Some error occurred");

					return res.send("Successfully switch device " + device.dname + " to " + device.status);
				});

			})
		} else {
			return res.send('Invalid credentials.');
		}
	})
});

router.get('/add', function(req, res, next) {
  	res.render('device', { title: 'Add Device'});
});

router.post('/add', function(req, res, next) {
	
	var body = req.body;

	User.findOne({uname: body.uname, password: body.password}, function(err, user) {
		if(err) return res.send('Some error ocurred');

		if(user) {
			Device.findOne({dname: body.dname, uname: user.uname}, function(err, device) {
				if(err) return res.send('Some error occured');

				if(device) return res.send("Device already exists");
				var newDevice = new Device({
					uname: user.uname,
					dname: body.dname,
					status: false
				});
				newDevice.save(function(err) {
					if(err) return res.send("Some error occurred");

					return res.send("Successfully added device.");
				});

			})
		} else {
			return res.send('Invalid credentials.');
		}
	})
});

router.get('/getStatus', function(req, res, next) {
	console.log(req.query.dname);
	Device.findOne({dname: req.query.dname}, function(err, device) {
	  	if(err) return res.send("Some error occurred");
	  	
	  	if(device) {
	  		res.send((device.status)?"1":"0");
	  	} else {
	  		res.send("Invalid device name");
	  	}
	});
});

module.exports = router;
