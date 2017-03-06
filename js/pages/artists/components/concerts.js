import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions/index';

class Concerts extends React.Component{
	constructor(){
		super();
	}
	componentDidMount(){
		console.log('concerts')
	}
	render(){
		return(
			<div>
				<h3>{this.props.name} Concerts</h3>
			</div>
		)
	}
}

module.exports = Concerts;