import bcrypt from 'bcryptjs'

import User from '../models/user';

const register = function(req, res) {
	if(!req.body){
		return res.status(400).json({
			message: 'No request body'
		});
	}

	if(!('firstName' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: firstName'
		});
	}

	let firstname = req.body.firstName;

	if(typeof firstname !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: firstName'
		});
	}

	firstname = firstname.trim();

	if(firstname === '') {
		return res.status(422).json({
			message: 'Incorrect field length: firstName'
		});
	}

	if(!('surName' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: surName'
		});
	}

	let surname = req.body.surName;

	if(typeof surname !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: surName'
		});
	}

	surname = surname.trim();

	if(surname === '') {
		return res.status(422).json({
			message: 'Incorrect field length: surName'
		});
	}	

	if(!('username' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: username'
		});
	}

	let username = req.body.username;

	if(typeof username !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: username'
		});
	}

	username = username.trim();

	if(username === '') {
		return res.status(422).json({
			message: 'Incorrect field length: username'
		});
	}

	if(!('password' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: password'
		});
	}

	let password = req.body.password;

	if(typeof password !== 'string'){
		return res.status(422).json({
			message: 'Incorrect field type: password'
		});
	}

	password = password.trim();

	if(password === '') {
		return res.status(422).json({
			message: 'Incorrect field length: password'
		});
	}

	if(!('email' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: email'
		});
	}

	let email = req.body.email;

	if(typeof email !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: email'
		});
	}

	email = email.trim();

	if(email === '') {
		return res.status(422).json({
			message: 'Incorrect field length: email'
		});
	}

	if(!('phone' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: phone'
		});
	}

	let phone = req.body.phone;

	if(typeof phone !== 'number') {
		return res.status(422).json({
			message: 'Incorrect field type: phone'
		});
	}

	// phone = phone.trim();

	if(phone === '') {
		return res.status(422).json({
			message: 'Incorrect field length: phone'
		});
	}

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
				firstName: req.body.firstName,
				surName: req.body.surName,
				userName: username,
				password: hash,
				email: req.body.email,
				phone: req.body.phone,
				member: req.body.member
			});

			user.save((err) => {
				if(err){
					return res.status(500).json({
						message: 'Internal Server Error'
					});
				}

				return res.status(201).json({});
			});
		});
	});
}

exports.register = register;