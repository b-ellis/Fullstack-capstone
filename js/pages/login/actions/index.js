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
			username: user.username,
			password: user.password,
		})
		.then((res) => {
			return dispatch(
				postUserSuccess(res)
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

const fetchUserProfile = (user) => {

	// const username = user.userName;
	// const password = user.password;
	// const hash = new Buffer(`${username}:${password}`).toString('base64');
	// console.log(hash)
	// const config = {
	// 	headers: {
	// 		'Authorization': `Basic ${hash}`
	// 	}
	// };
	return (dispatch) => {
		axios.post('/login', {
			username: user.userName,
			password: user.password,
		})
		.then((res) => {
			console.log(res)
			return dispatch(
				userLoginSuccess(res)
			)	
		})
		.catch((err) => {
			return dispatch(
				userLoginError(err)
			)
		});
	}
}

// const hash = new Buffer(${username}:${password}).toString('base64')
// fetch('https://httpbin.org/basic-auth/admin/secret', { headers: { 'Authorization': Basic ${hash} } })

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
	// console.log(username)
		return (dispatch) => {
		axios.post('/user', {
			username: username,
		})
		.then((res) => {
			// console.log(res)
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

const CHECK_USERPASS_SUCCESS = 'CHECK_USERPASS_SUCCESS';
const checkUserpassSuccess = (message) => {
	return{
		type: CHECK_USERPASS_SUCCESS,
		loginMessage: message
	}
}

const CHECK_USERPASS_ERROR = 'CHECK_USERPASS_ERROR';
const checkUserpassError = (error) => {
	return{
		type: CHECK_USERPASS_ERROR,
		loginError: error
	}
}

const checkUserpass = (user) => {
	return(dispatch) => {
		axios.post('/userpass', {
			username: user.userName,
			password: user.password
		})
		.then((res) => {
			console.log(res.data.message)
			const message = res.data.message;
			if(message === 'Success'){
				dispatch(checkUserpassSuccess(message));
				dispatch(fetchUserProfile(user));
				return;
			} else {
				return dispatch(
					checkUserpassSuccess(message)
				)
			}
		})
		.then((err) => {
			return dispatch(checkUserpassError(err))
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

exports.fetchUserProfile = fetchUserProfile;

exports.CHECK_USER_SUCCESS = CHECK_USER_SUCCESS;
exports.checkUserSuccess = checkUserSuccess;

exports.CHECK_USER_ERROR = CHECK_USER_ERROR;
exports.checkUserError = checkUserError;

exports.checkUser = checkUser;

exports.CHECK_USERPASS_SUCCESS = CHECK_USERPASS_SUCCESS;
exports.checkUserpassSuccess = checkUserpassSuccess;

exports.CHECK_USERPASS_ERROR = CHECK_USERPASS_ERROR;
exports.checkUserpassError = checkUserpassError;

exports.checkUserpass = checkUserpass;