import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

let LoginForm = (props) => {
	let { handleSubmit, val } = props;

	return(
		<div>
			Sign In
			<form method='post' action='/login' onSubmit={handleSubmit}>
				<label>Username</label>
				<div>
					<Field val={val} name='username' label='Username' type='text' component={userRenderField} />
				</div>
				<label>Password</label>
				<div>
					<Field val={val} name='password' label='Password' type='password' component={passRenderField} />
				</div>
				<Link><input type='submit' className="btn btn-default" value="Sign In" onClick={handleSubmit} /></Link>
			</form>
		</div>
	)
}

const userRenderField = ({ val, name, input, label, type, meta: { touched, error } }) => {
	if(val.error === "Username does not exist"){
		return (
			<div>
				<input style={{textAlign:'center'}} className='form-control' {...input} name={name} type={type} placeholder={label} required/><br />
				<div className="alert alert-danger" role="alert">
					<span>{val.error}</span>
				</div>
			</div>
		)
	} 
	if(val.data === 'Success'){
		return (
			<div>
				<input style={{textAlign:'center'}} className='form-control' {...input} name={name} type={type} placeholder={label} required/>
			</div>
		)
	} else {
		return(
			<div>
				<input style={{textAlign:'center'}} className='form-control' {...input} name={name} type={type} placeholder={label} required/><br />
				{touched && ((error && <span>{error}</span>))}
			</div>
		)
	}
}

const passRenderField = ({ val, name, input, label, type, meta: { touched, error } }) => {
	if(val.error === "Incorrect password"){
		return (
			<div>
				<input style={{textAlign:'center'}} className='form-control' {...input} name={name} type={type} placeholder={label} required/><br />
				<div className="alert alert-danger" role="alert">
					<span>{val.error}</span>
				</div>
			</div>
		)
	} 
	if(val.data === 'Success'){
		return (
			<div>
				<input style={{textAlign:'center'}} className='form-control' {...input} name={name} type={type} placeholder={label} required/>
			</div>
		)
	} else {
		return(
			<div>
				<input style={{textAlign:'center'}} className='form-control' {...input} name={name} type={type} placeholder={label} required/><br />
				{touched && ((error && <span>{error}</span>))}
			</div>
		)
	}
}

LoginForm = reduxForm({
	form: 'LoginForm'
})(LoginForm);

module.exports = LoginForm;