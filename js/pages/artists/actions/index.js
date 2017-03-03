import axios from 'axios';

const GET_SPOTIFYARTIST_SUCCESS = 'GET_SPOTIFYARTIST_SUCCESS';
const getSpotifyArtistSuccess = (artist) => {
	return{
		type: GET_SPOTIFYARTIST_SUCCESS,
		artist: artist
	}
}

const GET_SPOTIFYARTIST_ERROR = 'GET_SPOTIFYARTIST_ERROR';
const getSpotifyArtistError = (error) => {
	return{
		type: GET_SPOTIFYARTIST_ERROR,
		error: error
	}
}

const getSpotifyArtist = (artist) => {
	return (dispatch) => {
		axios.get('/artist/' + artist )
		.then((res) => {
			console.log(res.data)
			return dispatch(getSpotifyArtistSuccess(res.data))
		})
		.catch((error) => {
			return dispatch(getSpotifyArtistError(error))
		});
	}
}

const GET_LASTINFO_SUCCESS = 'GET_LASTINFO_SUCCESS';
const getLastInfoSuccess = (info) => {
	return{
		type: GET_LASTINFO_SUCCESS,
		artistInfo: info
	}
}

const GET_LASTINFO_ERROR = 'GET_LASTINFO_ERROR';
const getLastInfoError = (error) => {
	return{
		type: GET_LASTINFO_ERROR,
		error: error
	}
}

const getLastInfo = (artist) => {
	return (dispatch) => {
		axios.get('/artistInfo/' + artist )
		.then((res) => {
			return dispatch(getLastInfoSuccess(res.data))
		})
		.catch((error) => {
			return dispatch(getLastInfoError(error))
		});
	}
}

exports.GET_SPOTIFYARTIST_SUCCESS = GET_SPOTIFYARTIST_SUCCESS;
exports.getSpotifyArtistSuccess = getSpotifyArtistSuccess;

exports.GET_SPOTIFYARTIST_ERROR = GET_SPOTIFYARTIST_ERROR;
exports.getSpotifyArtistError = getSpotifyArtistError;

exports.getSpotifyArtist = getSpotifyArtist;

exports.GET_LASTINFO_SUCCESS = GET_LASTINFO_SUCCESS;
exports.getLastInfoSuccess = getLastInfoSuccess;

exports.GET_LASTINFO_ERROR = GET_LASTINFO_ERROR;
exports.getLastInfoError = getLastInfoError;

exports.getLastInfo = getLastInfo;