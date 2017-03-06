import React from 'react';
import { hashHistory } from 'react-router'
import { Link } from 'react-router';
import axios from 'axios'

class Navbar extends React.Component {
	constructor(){
		super();
		this.signOut = this.signOut.bind(this)
	}
	signOut(){
		axios.get('/logout')
		.then((res) => {
			console.log(res)
			hashHistory.push('/');
		})
		.catch((err) => {
			console.log(err)
		});
	}
	render(){
		return(
			<div>
				<ul>
					<li><Link to='search'>Search</Link></li>
					<li><Link to='/profile'>Profile</Link></li>
					<li><Link onClick={this.signOut}>Sign Out</Link></li>
				</ul>
			</div>
		)
	}
}

module.exports = Navbar;