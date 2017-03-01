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

const GET_SCHEDULE_SUCCESS = 'GET_SCHEDULE_SUCCESS';
const getScheduleSuccess = (schedule) => {
	return{
		type: GET_SCHEDULE_SUCCESS,
		schedule: schedule
	}
}

const GET_SCHEDULE_ERROR = 'GET_SCHEDULE_ERROR';
const getScheduleError = (error) => {
	return {
		type: GET_SCHEDULE_ERROR,
		error: error
	}
}

const getSchedule = () => {
	return (dispatch) => {
		axios.get('/schedule')
		// .then(res => res.json())
		.then((res) => {
			console.log(res)
			return dispatch(getScheduleSuccess(res.data))
		})
		.catch((error) => {
			return dispatch(getScheduleError(error))
		});
	}
}

exports.GET_RESULTS_SUCCESS = GET_RESULTS_SUCCESS;
exports.getResultsSuccess = getResultsSuccess;

exports.GET_RESULTS_ERROR = GET_RESULTS_ERROR;
exports.getResultsError = getResultsError;

exports.getResults = getResults;

exports.GET_SCHEDULE_SUCCESS = GET_SCHEDULE_SUCCESS;
exports.getScheduleSuccess = getScheduleSuccess;

exports.GET_SCHEDULE_ERROR = GET_SCHEDULE_ERROR;
exports.getScheduleError = getScheduleError;

exports.getSchedule = getSchedule;