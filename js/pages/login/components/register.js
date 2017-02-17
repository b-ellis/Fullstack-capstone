import React from 'react';
import { Field, reduxForm } from 'redux-form';

let RegisterForm = (props) => {
	let { handleSubmit } = props;

	return(
		<div>
		Register
			<form onSubmit={handleSubmit}>
				<label>First Name</label>
				<div>
					<Field name='firstName' label='First Name' type='text' component={renderField} />
				</div>
				<label>Last Name</label>
				<div>
					<Field name='lastName' label='Last Name' type='text' component={renderField} />
				</div>
				<label>Username</label>
				<div>
					<Field name='userName' label='Username' type='text' component={renderField} />
				</div>
				<label>Password</label>
				<div>
					<Field name='password' label='Password' type='password' component={renderField} />
				</div>
				<label>Email</label>
				<div>
					<Field name='email' label='Email' type='text' component={renderField} />
				</div>
				<input type='submit' onClick={handleSubmit} />
			</form>
		</div>
	)
}

const renderField = ({ name, input, label, type, meta: { touched, error } }) => (
  <div>
      <input {...input} name={name} type={type} placeholder={label} required/>
      {touched && ((error && <span>{error}</span>))}
  </div>
)

RegisterForm = reduxForm({
	form: 'RegisterForm'
})(RegisterForm);

module.exports = RegisterForm;