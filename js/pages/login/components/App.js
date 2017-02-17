import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import actions from '../actions/index';
import RegisterForm from './register';
import LoginForm from './login';

class App extends React.Component{
	constructor(){
		super();
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleRegisterSubmit(e){
		this.props.dispatch(actions.postUser(e))
	}
	handleSubmit(e){
		this.props.dispatch(actions.fetchUserProfile())
		// console.log(e)
	}
	render(){
		return(
			<div>
				<RegisterForm onSubmit={this.handleRegisterSubmit} />
				<LoginForm onSubmit={this.handleSubmit} />
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(App)

module.exports = Container;
// module.exports = App;