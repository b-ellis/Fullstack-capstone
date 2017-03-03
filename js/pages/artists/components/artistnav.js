import React from 'react';
import { Link } from 'react-router';

class Artistnavbar extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
			<div>
				<ul>
					<li><Link to={'/artist/'+ this.props.state.searchReducer.artist}>Artist Profile</Link></li>
					<li><Link to={'/artist/'+ this.props.state.searchReducer.artist +'/bio'}>Bio</Link></li>
					<li><Link to={'/artist/'+ this.props.state.searchReducer.artist + '/concerts'}>Concerts</Link></li>
					<li><Link>Chat</Link></li>
				</ul>
			</div>
		)
	}
}

module.exports = Artistnavbar;