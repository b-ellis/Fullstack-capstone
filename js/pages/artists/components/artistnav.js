import React from 'react';
import { Link } from 'react-router';

class Artistnavbar extends React.Component {
	constructor(){
		super();
	}
	render(){
		const artist = this.props.state.searchReducer.artist;
		const header = (name) => {
			if(/\s/.test(name)){
				name = name.replace(/\s+/g, '%20');
				return name;
			} else {
				return name;
			}
		}
		return(
			<div>
				<ul>
					<li><button onClick={() => {this.props.onClick('artist')}}>Artist Profile</button></li>
					<li><button onClick={() => {this.props.onClick('bio')}}>Bio</button></li>
					<li><button onClick={() => {this.props.onClick('concerts')}}>Concerts</button></li>
				</ul>
			</div>
		)
	}
}

module.exports = Artistnavbar;