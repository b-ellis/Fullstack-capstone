import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import actions from '../actions/index';


const reducer = (state={
	loggedin: false
}, action) => {

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
			data: action.data,
			username: action.username,
			loggedin: true
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
	}
	return state;
}

exports.loginReducer = reducer
