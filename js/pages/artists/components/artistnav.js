import React from 'react';
import { Link } from 'react-router';
import { Tabs, Tab } from 'react-bootstrap';

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
				<Tabs defaultActiveKey={this.props.tabs} onClick={this.props.onClick} id='tabs'>
					<Tab className='artist' eventKey={'artist'} title="Artist Page" />
					<Tab className='bio' eventKey={'bio'} title="Bio" />
				</Tabs>
			</div>
		)
	}
}

					// <Tab className='concerts' eventKey={'concerts'} title="Concerts" />

module.exports = Artistnavbar;