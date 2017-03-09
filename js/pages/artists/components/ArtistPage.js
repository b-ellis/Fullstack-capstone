import React from 'react'
import { connect } from 'react-redux';


import actions from '../actions/index';
import { storeArtist } from '../../search/actions/index';

import Loading from 'react-Loading';
// import LoadingPage from './loading';
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
		this.state = {
			page: 'artist',
			artist: null,
			// tabs: 'bio'
		}
	}
	componentWillMount(){
		this.setState({
			artist: this.props.routeParams.name
		})
		const artist = this.props.routeParams.name;
		console.log(artist)
		this.props.dispatch(storeArtist(artist));
		this.props.dispatch(actions.getSpotifyArtist(artist));
		this.props.dispatch(actions.getLastInfo(artist));
	}
	componentWillReceiveProps(nextProp){
		if(nextProp.routeParams.name !== this.props.routeParams.name){
			this.props.dispatch(actions.getSpotifyArtist(nextProp.routeParams.name));
			this.props.dispatch(actions.getLastInfo(nextProp.routeParams.name));
		}
	}
	// handelSelect(key){
	// 	this.setState({key})
	// 	this.props.onClick(this.state.key)
	// }
	changeNavigation(page){
		page = page.target.id;
		page = page.split('tabs-tab-').join("");
		this.setState({
			page: page
		})
	}
	storeArtist(e){
		let artist = e.target.className;
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
	}
	componentWillUnmount(){
		console.log(this.state.artist + ' did unmount')
	}
	render(){
		if(!this.props.state.artistReducer.artist || this.props.state.artistReducer.artist.name !== this.props.routeParams.name){
			return(
				<div>
					<Artistnavbar tabs={this.state.page} onClick={this.changeNavigation} state={this.props.state}/>
					<div>
						<Loading type='bars' color='#e3e3e3' />
					</div>
				</div>
			)
		}
		switch(this.state.page){

			case 'artist':
			return(
				<div>
					<Artistnavbar tabs={this.state.tabs} onClick={this.changeNavigation} state={this.props.state}/>
					<div>
						<Artists storeArtist={this.storeArtist} dispatch={this.props.dispatch} 
						name={this.props.routeParams.name} artists={this.state.artist} 
						image={this.props.state.artistReducer.artist.images[0].url}
						related={this.props.state.artistReducer.artist.related}
						saveArtist={this.saveArtist} />
					</div>
				</div>
			);

			case 'bio':
			return(
				<div>
					<Artistnavbar tabs={this.state.tabs} onClick={this.changeNavigation} state={this.props.state}/>
					<div>
						<Bio name={this.props.routeParams.name}  artists={this.props.state}/>
					</div>
				</div>
			);

			case 'concerts':
			return(
				<div>
					<Artistnavbar tabs={this.state.tabs} onClick={this.changeNavigation} state={this.props.state}/>
					<div>
						<Concert name={this.props.routeParams.name}  artist={this.props.state}/>
					</div>
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