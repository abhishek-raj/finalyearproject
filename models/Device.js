var mongoose = require('mongoose');

var DeviceSchema = mongoose.Schema({ 
	dname: {
		type: String,
		unique: true
	},
	uname: String,
	status: Boolean
});

var Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;