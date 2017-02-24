import React from 'react';
import { Field, reduxForm } from 'redux-form';

let LoginForm = (props) => {
	let { handleSubmit, val } = props;

	return(
		<div>
			Sign In
			<form method='post' action='/login' onSubmit={handleSubmit}>
				<label>Username</label>
				<div>
					<Field val={val} name='userName' label='Username' type='text' component={userRenderField} />
				</div>
				<label>Password</label>
				<div>
					<Field val={val} name='password' label='Password' type='password' component={passRenderField} />
				</div>
				<input type='submit' value="Sign In" onClick={handleSubmit} />
			</form>
		</div>
	)
}

const userRenderField = ({ val, name, input, label, type, meta: { touched, error } }) => {
	if(val.loginMessage === "Username does not exist"){
		return (
			<div>
				<input {...input} name={name} type={type} placeholder={label} required/>
				<span>{val.loginMessage}</span>
			</div>
		)
	} 
	if(val.loginMessage === 'Success'){
		return (
			<div>
				<input {...input} name={name} type={type} placeholder={label} required/>
			</div>
		)
	} else {
		return(
			<div>
				<input {...input} name={name} type={type} placeholder={label} required/>
				{touched && ((error && <span>{error}</span>))}
			</div>
		)
	}
}

const passRenderField = ({ val, name, input, label, type, meta: { touched, error } }) => {
	if(val.loginMessage === "Incorrect password"){
		return (
			<div>
				<input {...input} name={name} type={type} placeholder={label} required/>
				<span>{val.loginMessage}</span>
			</div>
		)
	} 
	if(val.loginMessage === 'Success'){
		return (
			<div>
				<input {...input} name={name} type={type} placeholder={label} required/>
			</div>
		)
	} else {
		return(
			<div>
				<input {...input} name={name} type={type} placeholder={label} required/>
				{touched && ((error && <span>{error}</span>))}
			</div>
		)
	}
}

LoginForm = reduxForm({
	form: 'LoginForm'
})(LoginForm);

module.exports = LoginForm;