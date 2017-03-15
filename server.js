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
import { getApi, getLastApi, getJambaseApi } from './server/api';

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

app.get('/auth',  (req, res) => {
	// console.log(req.headers);
	if(req.headers.authorization){
		return res.json({
			message: 'user authorized'
		});
	} else {
		return res.json({
			message: 'user not authorized'
		});
	}
});

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
				username: req.body.username
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

app.post('/logout', passport.authenticate('basic', {session: false}), (req, res) => {
  req.logout();
  delete req.headers.authorization;
  if(!req.headers.authorization){
  	return res.json({
  		message: 'Logged Out'
  	});
  } else {
  	return res.status(500).json({
  		message: 'Auth Header Still Set'
  	});
  }

});

app.get('/user', passport.authenticate('basic', {session: false}), (req, res) => {
	
	const auth = req.headers.authorization.split('Basic ').pop();
	const string = new Buffer(auth, 'base64')
	const decodedUsername = string.toString();
	const username = decodedUsername.split(':')[0];


	User.findOne({
		username: username
	}, (err, user) => {
		if(err){
			return res.status(500).json({
				message: 'Failed'
			});
		}
		if(user){
			return res.json({
				username: user.username,
				favorites: user.favorites
			});
		} else {
			return res.json({
				message: 'user not logged in'
			})
		}
	})
});

app.post('/favorite/:artist', passport.authenticate('basic', {session: false}), (req, res) => {

	const auth = req.headers.authorization.split('Basic ').pop();
	const string = new Buffer(auth, 'base64')
	const decodedUsername = string.toString();
	const username = decodedUsername.split(':')[0];

	User.findOneAndUpdate(
		{'username': username}, 
		{'$addToSet': {'favorites': {
			'artist': req.params.artist,
			'imgurl': req.body.imgurl
		}}}, 
		(err, artist) => {
		if(err){
			console.log(err);
			return res.status(500).json({
				message: 'Could not save artist'
			});
		}
		if(artist){
			return res.json({
				artist: req.params.artist
			});
		}
	});
});

app.delete('/favorite/:artist', passport.authenticate('basic', {session: false}), (req, res) => {

	const auth = req.headers.authorization.split('Basic ').pop();
	const string = new Buffer(auth, 'base64')
	const decodedUsername = string.toString();
	const username = decodedUsername.split(':')[0];

	User.findOneAndUpdate(
		{'username': username},
		{'$pull': {'favorites': {'artist': req.params.artist } } },
		false,
	(err, artist) => {
		if(err){
			console.log(err);
			return res.status(500).json({
				message: 'Could not delete artist'
			});
		}
		if(artist){
			return res.json({
				message: req.params.artist + ' deleted'
			});
		};
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
		const artist = data.artists.items[0];
		const related = getApi('artists', artist.id);

		related.on('end', (item) => {
			artist.related = item.artists;

			res.json(artist);
		})
		// res.json(data);
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

app.get('/artistconcert/:name', passport.authenticate('basic', {session: false}), (req, res) => {
	console.log(req.params.name)
	const concertResult = getJambaseApi('artist', {
		name: req.params.name,
		api_key: 'vrchjvtc2yyx7wzs56hsuprd'
	});

	concertResult.on('end', (data) => {
		console.log(data)
		res.json(data);
	});

	concertResult.on('error', (err) => {
		res.status(404).json({
			message: 'Could not contact Bandsintown Api'
		});
	});
});

