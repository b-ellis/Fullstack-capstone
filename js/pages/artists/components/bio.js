import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions/index';

class Bio extends React.Component{
	constructor(){
		super();
	}
	componentDidMount(){
		console.log('bio');
	}
	render(){
		const art = this.props.artists.artistReducer;
		let info;
		if(art){
			const artistInfo = art.artistInfo.artist.bio.content.split('<')[0];
			info = <p className='col-md-12'>{artistInfo}</p>
		}
		return(
			<div>
				<h3>{this.props.name} Bio</h3>
				{info}
			</div>
		)
	}
}

module.exports = Bio;