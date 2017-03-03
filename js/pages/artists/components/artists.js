import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions/index';

class Artists extends React.Component {
	constructor(){
		super();
	}
	componentWillMount(){
		this.props.dispatch(actions.getSpotifyArtist(this.props.state.searchReducer.artist));
	}
	render(){
		const artist = this.props.state.searchReducer.artist;
		const art = this.props.state.artistReducer.artist;
		let artistImage;
		let playlist;
		if(art){
			const image = art.artists.items[0].images[0].url;
			artistImage = <img src={image} />
			const Playlist = art.artists.items[0].uri;
			playlist = <iframe src={"https://embed.spotify.com/?uri=" + Playlist} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
		}
		return(
			<div>
				<h1>{artist}</h1>
				{artistImage}
				{playlist}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(Artists)

module.exports = Container;