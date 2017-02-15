require('babel-polyfill');
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	surName: {type: String, required: true},
	userName: {type: String, required: true, unique: true},
	password: {type: String, required:true},
	email: {type: String, required: true},
	phone: {type: Number, required: true},
	member: {type: Number}
});

userSchema.methods.validatePassword = function(password, callback) {
	console.log(this.password);
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