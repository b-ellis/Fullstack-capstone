import actions from '../actions/index';

const userReducer = (state={}, action) => {
	switch(action.type){
		case actions.GET_PROFILE_SUCCESS:
		const profileState = Object.assign({}, state, {
			user: action.user
		});
		return profileState;

		case actions.DELETE_ARTIST_SUCESS:
		const deletedState = Object.assign({}, state, {
			message: action.message
		});
		return deletedState;
	}
	return state;
}

exports.userReducer = userReducer;