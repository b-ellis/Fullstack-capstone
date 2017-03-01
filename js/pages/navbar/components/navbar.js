import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
			<div>
				<ul>
					<li><Link to='search'>Search</Link></li>
					<li><Link to='/profile'>Profile</Link></li>
					<li><Link>Sign Out</Link></li>
				</ul>
			</div>
		)
	}
}

module.exports = Navbar;