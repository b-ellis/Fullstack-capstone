import axios from 'axios';
import fetch from 'isomorphic-fetch'

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
			firstName: user.firstName,
			surName: user.lastName,
			username: user.userName,
			password: user.password,
			email: user.email
		})
		.then((res) => {
			return dispatch(
				postUserSuccess(res)
			)	
		})
		.catch((err) => {
			return dispatch(
				postUserError(error)
			)
		});
	}
}

const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = (data) => {
	return{
		type: USER_LOGIN_SUCCESS,
		data: data
	}
}

const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
const userLoginError = (error) => {
	return{
		type: USER_LOGIN_ERROR,
		error: error
	}
}

const fetchUserProfile = () => {
	return (dispatch) => {
		const url = '/login';
		return fetch(url).then((res) => {
			if(res.status < 200 || res.status >= 300) {
				const error = new Error(res.statusText);
				error.response = res;
				throw error;
			}
			return res;
		})
		.then(res => res.json)
		.then((data) => {
			return (
				userLoginSuccess(data)
			)
		})
		.catch((error) => {
			return (
				userLoginError(error)
			)
		})
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

exports.fetchUserProfile = fetchUserProfile;