import React from 'react'

import Navbar from '../../navbar/components/navbar';

class Application extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div className='react'>
				<Navbar className='navigation col-md-2'/>
				<div className='page col-md-10 pre-scrollable'>
					{this.props.children}
				</div>
			</div>
		)
	}
}

module.exports = Application;