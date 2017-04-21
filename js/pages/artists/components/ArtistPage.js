import React from 'react'
import { connect } from 'react-redux';


import actions from '../actions/index';
import { storeArtist } from '../../search/actions/index';
import { getProfile } from '../../profile/actions/index';
import { deleteArtist } from '../../profile/actions/index';

import Loading from 'react-loading';
import Artistnavbar from './artistnav';
import Artists from './artists.js';
import Bio from './bio';
import Concert from './concerts';


class ArtistPage extends React.Component{
	constructor(){
		super();
		this.changeNavigation = this.changeNavigation.bind(this);
		this.storeArtist = this.storeArtist.bind(this);
		this.saveArtist = this.saveArtist.bind(this);
		this.deleteArtist = this.deleteArtist.bind(this);
		this.state = {
			page: 'artist',
			color: 'black',
			artist: null
		}
	}
	componentWillMount(){
		this.setState({
			artist: this.props.routeParams.name
		})
		const artist = this.props.routeParams.name;
		this.props.dispatch(storeArtist(artist));
		this.props.dispatch(actions.getSpotifyArtist(artist));
		this.props.dispatch(actions.getLastInfo(artist));
		this.props.dispatch(getProfile());
	}
	componentWillReceiveProps(nextProp){
		if(nextProp.routeParams.name !== this.props.routeParams.name){
			this.props.dispatch(actions.getSpotifyArtist(nextProp.routeParams.name));
			this.props.dispatch(actions.getLastInfo(nextProp.routeParams.name));
			this.setState({
				artist: nextProp.routeParams.name
			})
		}
	}
	changeNavigation(page){
		page = page.target.id;
		page = page.split('tabs-tab-').join("");
		this.setState({
			page: page
		})
	}
	storeArtist(e){
		let artist = e.target.className;
		artist = artist.split('well')[0].trim();
		this.setState({
			artist: artist
		})
		this.props.dispatch(storeArtist(artist));
		this.props.dispatch(actions.getSpotifyArtist(artist));
		this.props.dispatch(actions.getLastInfo(artist));
	}
	saveArtist(e){
		e.preventDefault();
		this.props.dispatch(actions.saveArtist(this.state.artist, this.props.state.artistReducer.artist.images[0].url))
		this.setState({
			color: 'gold'
		});
	}
	deleteArtist(e){
		const artist = this.state.artist
		this.props.dispatch(deleteArtist(artist));
		this.setState({
			color: 'black'
		});
		this.props.dispatch(getProfile());
	}
	componentWillUnmount(){
		// console.log(this.state.artist + ' did unmount')
	}
	render(){
		if(!this.props.state.artistReducer.artist || this.props.state.artistReducer.artist.name !== this.props.routeParams.name){
			return(
				<div>
					<div style={{margin:'15% 53% 0% 47%'}}>
						<Loading type='bars' color='#e3e3e3' />
					</div>
				</div>
			)
		}
		switch(this.state.page){

			case 'artist':
			return(
				<div>
					<Artists storeArtist={this.storeArtist} dispatch={this.props.dispatch} 
					name={this.props.routeParams.name} artists={this.state.artist} 
					image={this.props.state.artistReducer.artist.images[0].url}
					related={this.props.state.artistReducer.artist.related}
					saveArtist={this.saveArtist}
					deleteArtist={this.deleteArtist}
					starcolor={this.state.color}
					favorites={this.props.state.userReducer.user.favorites}
					artistInfo={this.props.state.artistReducer.artistInfo.artist.bio} />
				</div>
			);
		}
	}
}


const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(ArtistPage)

module.exports = Container;