import actions from '../actions/index';

const artistReducer = (state={}, action) => {

	switch(action.type){

		case actions.GET_SPOTIFYARTIST_SUCCESS:
		const spotifyArtistState = Object.assign({}, state, {
			artist: action.artist
		});
		return spotifyArtistState;

		case actions.GET_LASTINFO_SUCCESS:
		const lastInfoState = Object.assign({}, state, {
			artistInfo: action.artistInfo
		});
		return lastInfoState;

		case actions.GET_BANDSINTOWN_SUCCESS:
		const concertState = Object.assign({}, state, {
			concerts: action.concerts
		});
		return concertState;
	}

	return state;
}

exports.artistReducer = artistReducer;