import actions from '../actions/index';
import { combineReducers } from 'redux';

const reducer = (state={}, action) => {

	switch(action.type){

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

		case actions.STORE_ARTIST:
		const artistState = Object.assign({}, state, {
			artist: action.artist
		});
		return artistState;
	}
	return state;
}

exports.searchReducer = reducer;