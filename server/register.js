import bcrypt from 'bcryptjs'

import User from '../models/user';

const register = function(req, res) {

	let username = req.body.username;
	username = username.trim();

	let password = req.body.password;
	password = password.trim();


	bcrypt.genSalt(10, (err, salt) => {
		if(err){
			return res.status(500).json({
				message: 'Internal Server Error'
			});
		}

		bcrypt.hash(password, salt, (err, hash) => {
			if(err){
				return res.status(500).json({
					message: 'Internal Server Error'
				});
			}

			const user = new User({
				username: username,
				password: hash,
			});

			console.log(user)

			user.save((err) => {
				console.log(err)
				if(err){
					return res.status(500).json({
						message: 'Internal Server Error: Could not save new user'
					});
				}

				return res.status(201).json({});
			});
		});
	});
}

exports.register = register;