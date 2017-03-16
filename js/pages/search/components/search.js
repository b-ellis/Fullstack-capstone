import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import actions from '../actions/index';
import Form from './form';

class Search extends React.Component {
	constructor(){
		super();
		this.searchArtist = this.searchArtist.bind(this);
		this.storeArtist = this.storeArtist.bind(this);
	}
	searchArtist(e){
		e.preventDefault();
		const artist = e.target.artist.value;
		this.props.dispatch(actions.getSearch(artist))
	}
	storeArtist(e){
		const artist = e.target.className;
		this.props.dispatch(actions.storeArtist(artist))
	}
	componentWillUnmount(){
		this.props.state.searchReducer = {};
	}
	render(){
		const artistList = [];
		if(this.props.state.searchReducer.results){
			const spotifyList = this.props.state.searchReducer.results.artists.items;
			const header = (name) => {
				if(/\s/.test(name)){
					name = name.replace(/\s+/g, '%20');
					return name;
				} else {
					return name;
				}
			}
			for(var i = 0; i < spotifyList.length; i ++){
				let item = 
					<li className='col-md-8 well well-sm' key={i}>
						<Link to={'/artist/' + header(spotifyList[i].name)} >
							<h3 className={spotifyList[i].name}>{spotifyList[i].name}</h3>
						</Link>
					</li>
				artistList.push(item);
			}
		}
		return(
			<div>
				<Form onSubmit={this.searchArtist}/>
				<div className='col-md-10 results-div'>
					<ul>{artistList}</ul>
				</div>
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