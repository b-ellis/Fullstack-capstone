import React from 'react'
import { connect } from 'react-redux';

import Artistnavbar from './artistnav';


class ArtistPage extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div>
				<Artistnavbar state={this.props.state}/>
				<div>
					{this.props.children}
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

const Container = connect(mapStateToProps)(ArtistPage)

module.exports = Container;