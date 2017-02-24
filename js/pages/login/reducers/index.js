import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import actions from '../actions/index';

const State = {
	// message: null,
	// username: null
}

const reducer = (state={}, action) => {
	// state = State || state;

	switch(action.type) {
		case actions.POST_USER_SUCCESS:
		const postState = Object.assign({}, state, {
			data: action.data
		});
		return postState;

		case actions.POST_USER_ERROR:
		const postStateError = Object.assign({}, state, {
			error: action.error
		});
		return postStateError;

		case actions.USER_LOGIN_SUCCESS:
		const loginState = Object.assign({}, state, {
			data: action.data
		});
		return loginState;

		case actions.USER_LOGIN_ERROR:
		const loginStateError = Object.assign({}, state, {
			error: action.error
		});
		return loginStateError;

		case actions.CHECK_USER_SUCCESS:
		const userState = Object.assign({}, state, {
			message: action.message,
			username: action.username
		});
		return userState;

		case actions.CHECK_USER_ERROR:
		const userStateError = Object.assign({}, state, {
			error: action.error
		});
		return userStateError;

		case actions.CHECK_USERPASS_SUCCESS:
		const userpassState = Object.assign({}, state, {
			loginMessage: action.loginMessage
		});
		console.log(userpassState)
		return userpassState;

		case actions.CHECK_USERPASS_ERROR:
		const userpassStateError = Object.assign({}, state, {
			error: action.error
		});
		return userpassStateError;
	}
	return state;
}

const combinedReducer = combineReducers({
	reducer: reducer,
	form: formReducer
})

exports.combinedReducer = combinedReducer;