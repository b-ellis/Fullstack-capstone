import axios from 'axios';
import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';

const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
const postUserSuccess = (data) => {
	return{
		type: POST_USER_SUCCESS,
		data: data
	}
}

const POST_USER_ERROR = 'POST_USER_ERROR';
const postUserError = (error) => {
	return{
		type: POST_USER_ERROR,
		error: error
	}
}

const postUser = (user) => {
	return (dispatch) => {
		axios.post('/register', {
			username: user.username,
			password: user.password,
		})
		.then((res) => {
			return dispatch(
				postUserSuccess(res)
			)
		})
		.then(() => {
			return dispatch(
				userLogin(user)
			)
		})
		.catch((err) => {
			return dispatch(
				postUserError(err)
			)
		});
	}
}

const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = (data, username) => {
	return{
		type: USER_LOGIN_SUCCESS,
		data: data,
		username: username
	}
}

const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
const userLoginError = (error) => {
	return{
		type: USER_LOGIN_ERROR,
		error: error
	}
}

const userLogin = (user) => {


	const username = user.username;
	const password = user.password;
	console.log("User logging in: " + user);

	return (dispatch) => {
		axios.post('/login', {
			username: username,
			password: password,
		})
		.then((res) => {
			const message = res.data.message;
			if(message === 'Success'){
				const hash = new Buffer(`${username}:${password}`).toString('base64');
				axios.defaults.headers.common['Authorization'] = 'Basic ' + hash;
				dispatch(userLoginSuccess(message, res.data.username));
				hashHistory.push('/profile');
				console.log("Header after login: " + axios.defaults.headers.common['Authorization']);
				return;
			} else {
				return dispatch(
					userLoginSuccess(message)
				)
			}
		})
		.catch((err) => {
			const errMessage = err.response.data.message;
			console.log(errMessage)
			return dispatch(
				userLoginError(errMessage)
			)
		});
	}
}


const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
const checkUserSuccess = (message, username) => {
	return{
		type: CHECK_USER_SUCCESS,
		message: message,
		username: username
	}
}

const CHECK_USER_ERROR = 'CHECK_USER_ERROR';
const checkUserError = (error) => {
	return{
		type: CHECK_USER_ERROR,
		error: error
	}
}

const checkUser = (username) => {
		return (dispatch) => {
		axios.post('/user', {
			username: username,
		})
		.then((res) => {
			return dispatch(
				checkUserSuccess(res.data.message, res.data.username)
			)
		})
		.catch((err) => {
			return dispatch(
				checkUserError(err)
			)
		});
	}
}

const CHECK_USERAUTH_SUCCESS = 'CHECK_USERAUTH_SUCCESS';
const checkUserAuthSuccess = (message) => {
	return{
		type: CHECK_USERAUTH_SUCCESS,
		auth: message
	}
}

const CHECK_USERAUTH_ERROR = 'CHECK_USERAUTH_ERROR';
const checkUserAuthError = (error) => {
	return{
		type: CHECK_USERAUTH_ERROR,
		error: error
	}
}

const checkUserAuth = () => {
	return (dispatch) => {
		axios.get('/auth')
		.then((res) => {
			if(res.data.message === 'user authorized'){
				hashHistory.push('/search');
				return dispatch(
					checkUserAuthSuccess(res.data.message)
				)
			}
		})
		.then((error) => {
			return dispatch(
				checkUserAuthError(error)
			)
		});
	}
}


exports.POST_USER_SUCCESS = POST_USER_SUCCESS;
exports.postUserSuccess = postUserSuccess;

exports.POST_USER_ERROR = POST_USER_ERROR;
exports.postUserError = postUserError;

exports.postUser = postUser;

exports.USER_LOGIN_SUCCESS = USER_LOGIN_SUCCESS;
exports.userLoginSuccess = userLoginSuccess;

exports.USER_LOGIN_ERROR = USER_LOGIN_ERROR;
exports.userLoginError = userLoginError;

exports.userLogin = userLogin;

exports.CHECK_USER_SUCCESS = CHECK_USER_SUCCESS;
exports.checkUserSuccess = checkUserSuccess;

exports.CHECK_USER_ERROR = CHECK_USER_ERROR;
exports.checkUserError = checkUserError;

exports.checkUser = checkUser;

exports.CHECK_USERAUTH_SUCCESS = CHECK_USERAUTH_SUCCESS;
exports.checkUserAuthSuccess = checkUserAuthSuccess;

exports.CHECK_USERAUTH_ERROR = CHECK_USERAUTH_ERROR;
exports.checkUserAuthError = checkUserAuthError;

exports.checkUserAuth = checkUserAuth;
