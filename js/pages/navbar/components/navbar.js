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
		axios.post('/logout')
		.then((res) => {
			console.log(res);
			if(res.data.message === 'Logged Out'){
				// axios.defaults.headers.common['Authorization'] = '';
				hashHistory.push('/')
			}
			// axios.defaults.headers.common['Authorization'] = '';
			// hashHistory.push('/');
		})
		.catch((err) => {
			console.log(err)
		});
	}
	render(){
		return(
			<div className='navigation'>
				<nav className='navbar navbar-inverse'>
					<div className="container-fluid">
						<ul className='navlist'>
							<div className='link-div'>
								<li><Link to='search'>Search</Link></li>
								<li><Link to='/profile'>Profile</Link></li>
							</div>
							<div className='logout-div'>
								<li className='logout'><Link onClick={this.signOut}>Sign Out</Link></li>
							</div>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

module.exports = Navbar;