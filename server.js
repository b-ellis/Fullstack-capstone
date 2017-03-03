require('babel-polyfill');
import express from 'express'; 
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';
import passport from 'passport';
import unirest from 'unirest';
import events from 'events';

import config from './config'; 
import User from './models/user';
import Profile from './models/profile';
import { register } from './server/register';
import { strategy } from './server/validation';
import { getApi, getLastApi } from './server/api';

const jsonParser = bodyParser.json();
const app = express();

app.use(express.static('build'));
app.use(jsonParser);

mongoose.Promise = require('bluebird');

const runServer = (callback) => {
    mongoose.connect(config.DATABASE_URL, (err) =>{
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, () => {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Server up and running well!");
        }
    });
}

app.post('/register', (req, res) => {
	console.log(req.body);
	register(req, res);
}); 

passport.use(strategy);
app.use(passport.initialize());

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({
		username: username
	}, (err, user) => {
		if(err){
			return res.status(500).json({
				message: 'Failed'
			})
		}

		if(!user){
			return res.status(401).json({
				message: 'Username does not exist'
			}); 
		}

		user.validatePassword(password, (err, isVaild) => {
			if(err){
				return (err);
			}

			if(!isVaild){
				return res.status(401).json({
					message: 'Incorrect password'
				}); 
			}

			return res.json({
				message: 'Success',
			});
		});
	});

});

app.post('/user', (req, res) => {
	const username = req.body.username;

	User.findOne({
		username: username
	},(err, user) => {
		if(err){
			return res.status(500).json({
				message: 'Failed'
			});
		}
		if(user === null){
			return res.json({
				message: 'Username is not taken'
			});
		}
		if(user.username === username){
			return res.json({
				message: 'Username already exists',
				username: user.username
			});
		}
	});
});


app.get('/search/:name', passport.authenticate('basic', {session: false}), (req, res) => {
	const result = getApi('search', {
		q: req.params.name,
		limit: 5,
		type: 'artist'
	});

	result.on('end', (data) => {
		res.json(data);
	});

	result.on('error', (err) => {
		res.status(404).json({
			message: 'Could not contact api'
		});
	});
});

app.get('/artist/:name', passport.authenticate('basic', {session: false}), (req, res) => {
	const result = getApi('search', {
		q: req.params.name,
		limit: 1,
		type: 'artist'
	});


	result.on('end', (data) => {
		res.json(data);
	});

	result.on('error', (err) => {
		res.status(404).json({
			message: 'Could not contact spotify api'
		});
	});
});

app.get('/artistInfo/:name', passport.authenticate('basic', {session: false}), (req, res) => {
	const lastResult = getLastApi({
		artist: req.params.name,
		api_key: 'a8648cd3364fea6904b5f36a3e929b8f'
	});
	
	lastResult.on('end', (data) => {
		res.json(data)
	});

	lastResult.on('error', (err) => {
		res.status(404).json({
			message: 'Could not contact Last.fm api'
		});
	});
});