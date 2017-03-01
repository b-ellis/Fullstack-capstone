import actions from '../actions/index';
import { combineReducers } from 'redux';

const reducer = (state={}, action) => {

	switch(action.type){
		case actions.GET_RESULTS_SUCCESS:
		const resultsState = Object.assign({}, state, {
			results: action.results
		});
		return resultsState;

		case actions.GET_RESULTS_ERROR:
		const resultsStateError = Object.assign({}, state, {
			error: action.error
		});
		return resultsStateError;

		case actions.GET_SCHEDULE_SUCCESS:
		const scheduleState = Object.assign({}, state, {
			schedule: action.schedule
		});
		return scheduleState;

		case actions.GET_SCHEDULE_ERROR:
		const scheduleStateError = Object.assign({}, state, {
			error: action.error
		});
		return scheduleStateError;
	}
	return state;
}

exports.gameReducer = reducer;