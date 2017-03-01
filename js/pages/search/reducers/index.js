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

		case actions.GET_SEARCH_SUCCESS:
		const searchState = Object.assign({}, state, {
			results: action.results
		});
		return searchState;

		case actions.GET_SEARCH_ERROR:
		const searchStateError = Object.assign({}, state, {
			error: action.error
		});
		return searchStateError;
	}
	return state;
}

exports.searchReducer = reducer;