import React from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import actions from '../actions/index';

class Profile extends React.Component {
	constructor(){
		super();
		this.deleteArtist = this.deleteArtist.bind(this);
	}
	componentWillMount(){
		this.props.dispatch(actions.getProfile());
	}
	deleteArtist(e){
		const artist = e.target.className.split('remove ')[1];
		this.props.dispatch(actions.deleteArtist(artist));
		this.props.dispatch(actions.getProfile());
	}
	render(){
		const overlayStyle = {
			  position: 'absolute',
			  top: 0,
			  bottom: 0,
			  left: 0,
			  right: 0,
			  height: '100%',
			  width: '100%',
			  opacity: 0,
			  transition: '.5s ease'
		}
		if(!this.props.state.userReducer.user){
			return(
				<div style={{margin:'15% 53% 0% 47%'}}>
					<Loading type='bars' color='#e3e3e3' />
				</div>
			)

		} else {
			const header = (name) => {
				if(/\s/.test(name)){
					name = name.replace(/\s+/g, '%20');
					return name;
				} else {
					return name;
				}
			}
			const favoriteArtists = [];
			const artistlength = this.props.state.userReducer.user.favorites.length;
			const artist = this.props.state.userReducer.user.favorites;
			for(let i=0;i<artistlength;i++){
				const artimg = 
				<li key={i} className='img-container'>
					
					<Link className='artistLink' to={'/artist/' + header(artist[i].artist)}>
						<img className='image col-md-6' src={artist[i].imgurl} />
					</Link>
				</li>
				favoriteArtists.push(artimg);
			}
			return(
				<div>
					<h3 className='favArtist' style={{textAlign:'center'}}>{this.props.state.userReducer.user.username + "'s "}Favortie Artists</h3>
					<ul style={{paddingLeft:'0px'}}>
						{favoriteArtists}
					</ul>	
				</div>
			)	
		}
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