require('babel-polyfill');
import express from 'express'; 
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';
import passport from 'passport';
import unirest from 'unirest';
import events from 'events'

import config from './config'; 
import User from './models/user';
import Profile from './models/profile';
import { register } from './server/register';
import { strategy } from './server/validation';
import { getApi } from './server/api';

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
	register(req, res);
});

passport.use(strategy);
app.use(passport.initialize());

app.post('/login', passport.authenticate('basic', {
													session: false,
													successRedirect: '/results',
				                                   failureRedirect: '/login',
				                                   failureFlash: true 
													}), (req, res) => {

	const user = req.user;

	const profile = new Profile({
		name: user.firstName + ' ' + user.lastName,
		username: user.userName,
		email: user.email
	});

	res.json(profile);
	console.log(profile);
});

app.get('/schedule', (req, res) => {
	const endpoint = '2016-2017-regular/full_game_schedule.json'
	const result = getApi(endpoint);


	result.on('end', (data) => {
		res.json(data);
	});

	result.on('error', (err) => {
		res.status(404).json({
			message: 'Could not contact mysportsfeeds api'
		});
	});
});

app.get('/results', (req, res) => {
	const endpoint = '2016-2017-regular/scoreboard.json?fordate=20160911&'
	const result = getApi(endpoint);


	result.on('end', (data) => {
		res.json(data);
	});

	result.on('error', (err) => {
		res.status(404).json({
			message: 'Could not contact mysportsfeeds api'
		});
	});
});