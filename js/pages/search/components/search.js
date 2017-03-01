import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import actions from '../actions/index';
import Form from './form';

class Search extends React.Component {
	constructor(){
		super();
		this.searchArtist = this.searchArtist.bind(this)
	}
	searchArtist(e){
		e.preventDefault();
		const artist = e.target.artist.value;
		this.props.dispatch(actions.getSearch(artist))
	}
	render(){
		const artistList = [];
		if(this.props.state.searchReducer.results){
			const spotifyList = this.props.state.searchReducer.results.artists.items;
			for(var i = 0; i < 5; i ++){
				let item = 
						<li key={i}>
							<Link to={'/artist/' + spotifyList[i].name}><h3>{spotifyList[i].name}</h3></Link>
						</li>
				artistList.push(item);
			}
		}
		return(
			<div>
				<Form onSubmit={this.searchArtist}/>
				<ul>{artistList}</ul>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(Search)

module.exports = Container;