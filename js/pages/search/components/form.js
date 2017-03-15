import React from 'react';
import 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

class Form extends React.Component {
	render(){
		return(
			<div className='form-div col-md-12'>
				<form className="form-inline formDiv col-md-8" onSubmit={this.props.onSubmit}>
					<input className='form-control col-md-8 search' type='text' name='artist' placeholder='Search Artist'/>
					<input className='btn btn-defaul' type='submit' placeholder='Search' onSubmit={this.props.onSubmit}/>
				</form>
			</div>
		)
	}
}

module.exports = Form;