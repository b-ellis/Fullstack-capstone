import React from 'react';
import Loading from 'react-Loading';
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
		this.props.dispatch(actions.deleteArtist(e.target.className));
		this.props.dispatch(actions.getProfile());
	}
	render(){
		if(!this.props.state.userReducer.user){
			return(
				<div>
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
				const artistDiv =
					<li key={i}>
						<div>
							<Link to={'/artist/' + header(artist[i].artist)}>{artist[i].artist}</Link><br />
							<img width='100px' height='100px' src={artist[i].imgurl} /><br />
							<button className={artist[i].artist} onClick={this.deleteArtist}>Remove</button>
						</div>
					</li>
				favoriteArtists.push(artistDiv)
			}
			return(
				<div>
					<h1>{this.props.state.userReducer.user.username + "'s "}Profile</h1>
					<div>
						Favortie Artists
						<ul>
							{favoriteArtists}
						</ul>
					</div>
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