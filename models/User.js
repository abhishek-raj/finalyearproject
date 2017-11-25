var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({ 
	uname: {
		type: String,
		unique: true
	},
	password: String 
});

var User = mongoose.model('User', UserSchema);

module.exports = User;