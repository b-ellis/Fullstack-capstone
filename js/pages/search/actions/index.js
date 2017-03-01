import axios from 'axios';

const GET_RESULTS_SUCCESS = 'GET_RESULTS_SUCCESS';
const getResultsSuccess = (results) => {
	return{
		type: GET_RESULTS_SUCCESS,
		results: results
	}
}

const GET_RESULTS_ERROR = 'GET_RESULTS_ERROR';
const getResultsError = (error) => {
	return {
		type: GET_RESULTS_ERROR,
		error: error
	}
}

const getResults = () => {
	return (dispatch) => {
		axios.get('/results')
		// .then(res => res.json())
		.then((res) => {
			console.log(res.data);
			return dispatch(getResultsSuccess(res.data))
		})
		.catch((error) => {
			return dispatch(getResultsError(error))
		});
	}
}

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
		// .then(res => res.json())
		.then((res) => {
			console.log(res)
			return dispatch(getSearchSuccess(res.data))
		})
		.catch((error) => {
			return dispatch(getSearchError(error))
		});
	}
}



// exports.GET_RESULTS_SUCCESS = GET_RESULTS_SUCCESS;
// exports.getResultsSuccess = getResultsSuccess;

// exports.GET_RESULTS_ERROR = GET_RESULTS_ERROR;
// exports.getResultsError = getResultsError;

// exports.getResults = getResults;

exports.GET_SEARCH_SUCCESS = GET_SEARCH_SUCCESS;
exports.getSearchSuccess = getSearchSuccess;

exports.GET_SEARCH_ERROR = GET_SEARCH_ERROR;
exports.getSearchError = getSearchError;

exports.getSearch = getSearch;