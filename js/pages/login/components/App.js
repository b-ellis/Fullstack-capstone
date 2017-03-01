import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import actions from '../actions/index';
import RegisterForm from './register';
import LoginForm from './login';

class Login extends React.Component{
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
		this.props.dispatch(actions.userLogin(e))
	}
	checkUser(e){
		this.props.dispatch(actions.checkUser(e.target.value))
	}
	render(){
		return(
			<div>
				<RegisterForm user={this.props.state.loginReducer} onBlur={this.checkUser} onSubmit={this.handleRegisterSubmit} />
				<LoginForm val={this.props.state.loginReducer} onSubmit={this.handleSubmit} />
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(Login)

module.exports = Container;