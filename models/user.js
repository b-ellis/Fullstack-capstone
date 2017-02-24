require('babel-polyfill');
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required:true},
});

userSchema.methods.validatePassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, isVaild) {
		if(err){
			callback(err);
			return
		}
		callback(null, isVaild);
	});
}

const User = mongoose.model('User', userSchema);
module.exports = User;