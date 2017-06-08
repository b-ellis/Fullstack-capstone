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

const GET_BANDSINTOWN_SUCCESS = 'GET_BANDSINTOWN_SUCCESS';
const getBandsintownSuccess = (concerts) => {
	return{
		type: GET_BANDSINTOWN_SUCCESS,
		concerts: concerts
	}
}

const GET_BANDSINTOWN_ERROR = 'GET_BANDSINTOWN_ERROR';
const getBandsintownError = (error) => {
	return{
		type: GET_BANDSINTOWN_ERROR,
		error: error
	}
}

const getBandsintown = (artist) => {
	return(dispatch) => {
		axios.get('/artistconcert/' + artist)
		.then((res) => {
			return dispatch(getBandsintownSuccess(res.data))
		})
		.catch((error) => {
			return dispatch(getBandsintownError(error))
		});
	}
}

const SAVE_ARTIST_SUCCESS = 'SAVE_ARTIST_SUCCESS';
const saveArtistSuccess = (artist) => {
	return{
		type: SAVE_ARTIST_SUCCESS,
		favorite: artist
	}
}

const SAVE_ARTIST_ERROR = 'SAVE_ARTIST_ERROR';
const saveArtistError = (error) => {
	return{
		type: SAVE_ARTIST_ERROR,
		error: error
	}
}

const saveArtist = (artist, imgurl) => {
	return(dispatch) => {
		axios.post('/favorite/' + artist,{
			imgurl: imgurl,
			star: true
		})
		.then((res) => {
			console.log(res);
			return dispatch(
				saveArtistSuccess(res.data)
			)
		})
		.catch((error) => {
			return dispatch(
				saveArtistError(error)
			)
		});
	}
}

const GET_GOOGLE_SUCCESS = 'GET_GOOGLE_SUCCESS';
const getGoogleSuccess = (link) => {
	return{
		type: GET_GOOGLE_SUCCESS,
		url: link
	}
}

const GET_GOOGLE_ERROR = 'GET_GOOGLE_ERROR';
const getGoogleError = (error) => {
	return{
		type: GET_GOOGLE_ERROR,
		error: error
	}
}

const getGoogleResults = (artist) => {
	return(dispatch) => {
		axios.get('/google/' + artist)
		.then((res) => {
			return dispatch(
				getGoogleSuccess(res.data)
			)
		})
		.catch((error) => {
			dispatch(
				getGoogleError(error)
			)
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

exports.GET_BANDSINTOWN_SUCCESS = GET_BANDSINTOWN_SUCCESS;
exports.getBandsintownSuccess = getBandsintownSuccess;

exports.GET_BANDSINTOWN_ERROR = GET_BANDSINTOWN_ERROR;
exports.getBandsintownError = getBandsintownError;

exports.getBandsintown = getBandsintown;

exports.SAVE_ARTIST_SUCCESS = SAVE_ARTIST_SUCCESS;
exports.saveArtistSuccess = saveArtistSuccess;

exports.SAVE_ARTIST_ERROR = SAVE_ARTIST_ERROR;
exports.saveArtistError = saveArtistError;

exports.saveArtist = saveArtist;

exports.GET_GOOGLE_SUCCESS = GET_GOOGLE_SUCCESS;
exports.getGoogleSuccess = getGoogleSuccess;

exports.GET_GOOGLE_ERROR = GET_GOOGLE_ERROR;
exports.getGoogleError = getGoogleError;

exports.getGoogleResults = getGoogleResults;