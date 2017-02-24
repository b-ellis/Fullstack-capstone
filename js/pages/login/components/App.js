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
		this.checkUser = this.checkUser.bind(this)
	}
	handleRegisterSubmit(e){
		this.props.dispatch(actions.postUser(e))
	}
	handleSubmit(e){
		console.log(e)
		this.props.dispatch(actions.checkUserpass(e))
		// this.props.dispatch(actions.fetchUserProfile(e))
	}
	checkUser(e){
		this.props.dispatch(actions.checkUser(e.target.value))
	}
	render(){
		return(
			<div>
				<RegisterForm user={this.props.state.reducer} onBlur={this.checkUser} onSubmit={this.handleRegisterSubmit} />
				<LoginForm val={this.props.state.reducer} onSubmit={this.handleSubmit} />
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