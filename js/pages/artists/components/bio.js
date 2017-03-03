import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions/index';

class Bio extends React.Component{
	constructor(){
		super();
	}
	componentWillMount(){
		this.props.dispatch(actions.getLastInfo(this.props.state.searchReducer.artist));
	}
	render(){
		const art = this.props.state.artistReducer;
		let info;
		if(art){
			const artistInfo = art.artistInfo.artist.bio.content;
			info = <p>{artistInfo}</p>
		}
		return(
			<div>
				<h3>Bio</h3>
				{info}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(Bio)

module.exports = Container;