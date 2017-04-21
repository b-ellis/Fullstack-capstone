import axios from 'axios';

const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS';
const getSearchSuccess = (results) => {
	return{
		type: GET_SEARCH_SUCCESS,
		results: results
	}
}

const GET_SEARCH_ERROR = 'GET_SEARCH_ERROR';
const getSearchError = (error) => {
	return {
		type: GET_SEARCH_ERROR,
		error: error
	}
}

const getSearch = (artist) => {
	return (dispatch) => {
		axios.get('/search/' + artist )
		.then((res) => {
			return dispatch(getSearchSuccess(res.data))
		})
		.catch((error) => {
			return dispatch(getSearchError(error))
		});
	}
}

const STORE_ARTIST = 'STORE_ARTIST';
const storeArtist = (artist) => {
	return {
		type: STORE_ARTIST,
		artist: artist
	}
}

exports.GET_SEARCH_SUCCESS = GET_SEARCH_SUCCESS;
exports.getSearchSuccess = getSearchSuccess;

exports.GET_SEARCH_ERROR = GET_SEARCH_ERROR;
exports.getSearchError = getSearchError;

exports.getSearch = getSearch;

exports.STORE_ARTIST = STORE_ARTIST;
exports.storeArtist = storeArtist;