import { BasicStrategy } from 'passport-http';

import User from '../models/user';

const strategy = new BasicStrategy((username, password, callback) => {
	User.findOne({
		username: username
	}, (err, user) => {
		if(err){
			callback(err);
			return
		}

		if(!user){
			return callback(null, false, {
				message: 'Incorrect username'
			});
		}

		user.validatePassword(password, (err, isVaild) => {
			if(err){
				return callback(err);
			}

			if(!isVaild){
				return callback(null, false, {
					message: 'Incorrect password'
				});
			}

			return callback(null, user);
		});
	});
});

exports.strategy = strategy;