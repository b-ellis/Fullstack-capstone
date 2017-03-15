import axios from 'axios';
import hashHistory from 'react-router';

const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const getProfileSuccess = (profile) => {
	return{
		type: GET_PROFILE_SUCCESS,
		user: profile
	}
}

const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';
const getProfileError = (error) => {
	return{
		type: GET_PROFILE_ERROR,
		error: error
	}
}

const getProfile = () => {
	return (dispatch) => {
		axios.get('/user/')
		.then((res) => {
			return dispatch(
				getProfileSuccess(res.data)
			)
		})
		.catch((err) => {
			hashHistory.push('/');
			return dispatch(
				getProfileError(err)
			)
		});
	}
}

const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
const deleteArtistSuccess = (message) => {
	return{
		type: DELETE_ARTIST_SUCCESS,
		message: message
	}
}

const DELETE_ARTIST_ERROR = 'DELETE_ARTIST_ERROR';
const deleteArtistError = (error) => {
	return{
		type: DELETE_ARTIST_ERROR,
		error: error
	}
}

const deleteArtist = (artist) => {
	return (dispatch) => {
		axios.delete('/favorite/' + artist)
		.then((res) => {
			return dispatch(
				deleteArtistSuccess(res.data.message)
			)
		})
		.catch((error) => {
			return dispatch(
				deleteArtistError(error)
			)
		});
	}
}

exports.GET_PROFILE_SUCCESS = GET_PROFILE_SUCCESS;
exports.getProfileSuccess = getProfileSuccess;

exports.GET_PROFILE_ERROR = GET_PROFILE_ERROR;
exports.getProfileError = getProfileError;

exports.getProfile = getProfile;

exports.DELETE_ARTIST_SUCCESS = DELETE_ARTIST_SUCCESS;
exports.deleteArtistSuccess = deleteArtistSuccess;

exports.DELETE_ARTIST_ERROR = DELETE_ARTIST_ERROR;
exports.deleteArtistError = deleteArtistError;

exports.deleteArtist = deleteArtist;