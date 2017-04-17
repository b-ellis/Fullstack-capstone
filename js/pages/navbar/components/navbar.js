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
			console.log(axios.defaults.headers.common['Authorization'])
			if(res.data.message === 'Logged Out'){
				axios.defaults.headers.common['Authorization'] = '';
				console.log(axios.defaults.headers.common['Authorization'])
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

			<div style={{display:'-webkit-inline-box'}} className='log-nav'>
				<div style={{display:'-webkit-inline-box'}}>
					<div style={{display:'-webkit-inline-box'}}>
						<h4 className='name'>Musician |</h4>
					</div>
					<div className='link-div'>
						<div>
							<Link to='search'>Search</Link>
						</div>
						<div>
							<Link to='/profile'>Profile</Link>
						</div>		
						<div>
							<Link className='signOut' onClick={this.signOut}>Sign Out</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Navbar;