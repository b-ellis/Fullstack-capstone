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
	console.log(req.body);
	register(req, res);
}); 

passport.use(strategy);
app.use(passport.initialize());

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	console.log(req.headers)

	User.findOne({
		username: username
	}, (err, user) => {
		console.log(user);
		if(err){
			return res.status(500).json({
				message: 'Failed'
			})
		}

		if(!user){
			return res.status(500).json({
				message: 'Incorrect username'
			}); 
		}

		user.validatePassword(password, (err, isVaild) => {
			if(err){
				return (err);
			}

			if(!isVaild){
				return res.status(500).json({
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

app.post('/userpass', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({
		username: username
	}, (err, user) => {
		if(err){
			return res.status(500).json({
				message: 'Failed'
			});
		}
		if(!user){
			return res.json({
				message: 'Username does not exist'
			}); 
		}
		user.validatePassword(password, (err, isVaild) => {
			if(err){
				return (err);
			}

			if(!isVaild){
				return res.json({
					message: 'Incorrect password'
				}); 
			}

			return res.json({
				message: 'Success',
			});
		});
	});
})

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