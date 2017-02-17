import React from 'react';
import { Field, reduxForm } from 'redux-form';

let LoginForm = (props) => {
	let { handleSubmit } = props;

	return(
		<div>
			Sign In
			<form onSubmit={handleSubmit}>
				<label>Username</label>
				<div>
					<Field name='userName' label='Username' type='text' component={renderField} />
				</div>
				<label>Password</label>
				<div>
					<Field name='password' label='Password' type='password' component={renderField} />
				</div>
				<input type='submit' value="Sign In" onClick={handleSubmit} />
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

LoginForm = reduxForm({
	form: 'LoginForm'
})(LoginForm);

module.exports = LoginForm;