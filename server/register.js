import bcrypt from 'bcryptjs'

import User from '../models/user';

const register = function(req, res) {

	// console.log(req.body);
	// if(!req.body){
	// 	return res.status(400).json({
	// 		message: 'No request body'
	// 	});
	// }

	// if(!('username' in req.body)) {
	// 	return res.status(422).json({
	// 		message: 'Missing field: username'
	// 	});
	// }

	let username = req.body.username;

	// if(typeof username !== 'string') {
	// 	return res.status(422).json({
	// 		message: 'Incorrect field type: username'
	// 	});
	// }

	username = username.trim();

	// if(username === '') {
	// 	return res.status(422).json({
	// 		message: 'Incorrect field length: username'
	// 	});
	// }

	// if(!('password' in req.body)) {
	// 	return res.status(422).json({
	// 		message: 'Missing field: password'
	// 	});
	// }

	let password = req.body.password;

	// if(typeof password !== 'string'){
	// 	return res.status(422).json({
	// 		message: 'Incorrect field type: password'
	// 	});
	// }

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