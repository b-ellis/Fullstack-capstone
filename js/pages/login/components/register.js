import React from 'react';
import { Field, reduxForm } from 'redux-form';
import actions from '../actions/index';

const { DOM: { input } } = React;

const validate = (values, props) => {
	const errors = {};
	if(!values.username){
		errors.username = 'Required'
	}
	if(!values.password){
		errors.password = 'Required'
	}
	return errors
}

let RegisterForm = (props) => {
	let { handleSubmit, onBlur, user } = props;
	return(
		<div>
		Register
			<form onSubmit={handleSubmit}>
				<Field user={user.message} onBlur={onBlur} name='username' label='Username' type='text' component={renderField} />
				<Field name='password' label='Password' type='password' component={passwordRenderField} />
				<input type='submit' onClick={handleSubmit} />
			</form>
		</div>
	)
}


const renderField = ({ user, name, input, label, type, meta: { asyncValidating, touched, error, userError } }) => {
	if(user == 'Username already exists'){
		userError = 'Username already exists'
		return(
			<div>
			<label>{label}</label>
				<div className={asyncValidating ? 'async-Validating' : ''}>
					<input {...input} name={name} type={type} placeholder={label} />
					<span>{userError}</span>
				</div>
			</div>
		)
	} else if(input.value == ''){
		return(
			<div>
			<label>{label}</label>
				<div className={asyncValidating ? 'async-Validating' : ''}>
					<input {...input} name={name} type={type} placeholder={label} />
					{touched && error && <span>Required</span>}
				</div>
			</div>
		)
	} else {
		return(
			<div>
			<label>{label}</label>
				<div className={asyncValidating ? 'async-Validating' : ''}>
					<input {...input} name={name} type={type} placeholder={label} />
					{touched && error && <span>{error}</span>}
				</div>
			</div>
		)
	}
}

const passwordRenderField = ({ user, name, input, label, type, meta: { asyncValidating, touched, error } }) => {
	return(
		<div>
		<label>{label}</label>
			<div className={asyncValidating ? 'async-Validating' : ''}>
				<input {...input} name={name} type={type} placeholder={label} />
				{touched && error && <span>{error}</span>}
			</div>
		</div>
	)
}

RegisterForm = reduxForm({
	form: 'RegisterForm',
	validate,
	asyncBlurFields: ['username']
})(RegisterForm);

module.exports = RegisterForm;