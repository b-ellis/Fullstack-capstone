import React from 'react';

class Nav extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div className='log-nav'>
				<div>
					<h4 className='name'>Musician |</h4>
				</div>
			</div>
		)
	}
}

module.exports = Nav;