import React from 'react'

import Navbar from '../../navbar/components/navbar';

class Application extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div>
				<Navbar />
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

module.exports = Application;