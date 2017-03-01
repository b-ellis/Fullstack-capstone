import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions/index';

class Game extends React.Component {
	constructor(){
		super();
		this.getResults = this.getResults.bind(this);
		this.getSchedule = this.getSchedule.bind(this);
	}
	getResults(){
		this.props.dispatch(actions.getResults())
	}
	getSchedule(){
		this.props.dispatch(actions.getSchedule())
	}
	render(){
		return(
			<div>
				<button onClick={this.getResults}>Results</button>
				<button onClick={this.getSchedule}>Schedule</button>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(Game)

module.exports = Container;