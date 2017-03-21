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
		const artist = e.target.className.split('remove ')[1];
		this.props.dispatch(actions.deleteArtist(artist));
		this.props.dispatch(actions.getProfile());
	}
	componentWillUnmount(){
		this.props.state.userReducer = {}
	}
	render(){
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
				const artistDiv =
					<li key={i}>
						<div style={{textAlign:'center'}} className='frame col-md-4 well well-md'>
							<span className={'x glyphicon glyphicon-remove ' + artist[i].artist} onClick={this.deleteArtist}/>
							<Link to={'/artist/' + header(artist[i].artist)}>
								{artist[i].artist}<br />
								<img className='image' src={artist[i].imgurl} />
							</Link><br />
						</div>
					</li>
				favoriteArtists.push(artistDiv)
			}
			return(
				<div>
					<h1>{this.props.state.userReducer.user.username + "'s "}Profile</h1>
					<div>
						<h3 style={{textAlign:'center'}}>Favortie Artists</h3>
						<ul className='favorite-artists'>
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