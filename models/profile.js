import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
	name: {type: String},
	username: {type: String},
	favorite: {type: Array}

});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;