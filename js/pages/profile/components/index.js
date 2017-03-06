import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {
	render(){
		return(
			<div>
				<h1>Profile </h1>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return{
		state
	}
} 

const Container = connect(mapStateToProps)(Profile)

module.exports = Container;
// module.exports = Profile;