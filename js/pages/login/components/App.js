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
		this.checkUser = this.checkUser.bind(this);
		this.registerUser = this.registerUser.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.state = {
			form: 'login'
		}
	}
	componentWillMount(){
		this.props.dispatch(actions.checkUserAuth())
	}
	handleRegisterSubmit(e){
		this.props.dispatch(actions.postUser(e), actions.userLogin(e));
		
	}
	handleSubmit(e){
		this.props.dispatch(actions.userLogin(e))
	}
	checkUser(e){
		this.props.dispatch(actions.checkUser(e.target.value))
	}
	registerUser(){
		this.setState({
			form: 'register'
		});
	}
	loginUser(){
		this.setState({
			form: 'login'
		})
	}
	render(){
		switch(this.state.form){
			case 'login':
			return (
				<div className='well well-lg' style={{margin: '10% 25% 10% 25%', textAlign:'center'}}>
					<LoginForm val={this.props.state.loginReducer} onSubmit={this.handleSubmit} />
					<div>
						New User?<br />
						<span style={{cursor:'pointer', color:'blue'}} onClick={this.registerUser}>Register Here</span>
					</div>
				</div>
			)
			case 'register':
			return(
				<div className='well well-lg' style={{margin: '10% 25% 10% 25%', textAlign:'center'}}>
					<RegisterForm user={this.props.state.loginReducer} onBlur={this.checkUser} onSubmit={this.handleRegisterSubmit} />
					<div>
						Already Have An Account?<br />
						<span style={{cursor:'pointer', color:'blue'}} onClick={this.loginUser}>Login</span>
					</div>
				</div>
			)
		}
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(Login)

module.exports = Container;