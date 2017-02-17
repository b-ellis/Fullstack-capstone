import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import actions from '../actions/index';

const State = {}

const reducer = (state, action) => {
	state = State || state;

	switch(action.type) {
		case actions.POST_USER_SUCCESS:
		const postState = Object.assign({}, state, {
			data: action.data
		});
		return postState;

		case actions.USER_LOGIN_SUCCESS:
		const getState = Object.assign({}, state, {
			data: action.data
		});
		return getState;
	}
	return state;
}

const combinedReducer = combineReducers({
	reducer: reducer,
	form: formReducer
})

exports.combinedReducer = combinedReducer;