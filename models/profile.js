import mongoose from 'mongoose';

const Game = new mongoose.Schema({
	homeTeam: {type: Boolean},
	awayTeam: {type: Boolean}
});

const Week = new mongoose.Schema({
	week: [Game]
});

const Year = new mongoose.Schema({
	year: [Week]
});

const Season = new mongoose.Schema({
	season: [Year]
})

const profileSchema = new mongoose.Schema({
	name: {type: String},
	username: {type: String},
	email: {type: String},
	phone: {type: Number},
	picks: [Season],
	points: {type: Number}
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;