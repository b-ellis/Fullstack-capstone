import React from 'react';
import 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

class Form extends React.Component {
	render(){
		return(
			<div>
				<form className="form-inline formDiv" onSubmit={this.props.onSubmit}>
					<input type='text' name='artist' placeholder='Search Artist'/>
					<input type='submit' placeholder='Search' onSubmit={this.props.onSubmit}/>
				</form>
			</div>
		)
	}
}

module.exports = Form;