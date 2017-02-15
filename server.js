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
import { register } from './server/register';
import { strategy } from './server/validation';

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

const getApi = (endpoint) => {
	const emitter = new events.EventEmitter();
	const Request = unirest.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/' + endpoint);
	Request.auth('brad', 'Bushnellcraft', true)
	.end((res) => {
		if(res.ok) {
			emitter.emit('end', res.body);
		}
		else {
			emitter.emit('error', res.code);
		}
	});
	return emitter;
}

app.get('/login', passport.authenticate('basic', {session: false}), (req, res) => {
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


