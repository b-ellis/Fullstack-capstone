import React from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import actions from '../actions/index';

class Profile extends React.Component {
	constructor(){
		super();
		this.state ={
			hover: false
		}
		this.deleteArtist = this.deleteArtist.bind(this);
		this.handelMouseEnter = this.handelMouseEnter.bind(this);
		this.handelMouseLeave = this.handelMouseLeave.bind(this);
	}
	componentWillMount(){
		this.props.dispatch(actions.getProfile());
	}
	handelMouseEnter(){
		// this.setState({
		// 	hover: true
		// })
	}
	handelMouseLeave(){
		this.setState({
			hover: false
		})
	}
	deleteArtist(e){
		const artist = e.target.className.split('remove ')[1];
		this.props.dispatch(actions.deleteArtist(artist));
		this.props.dispatch(actions.getProfile());
	}
	// componentWillUnmount(){
	// 	this.props.state.userReducer = {}
	// }
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
			// const hoverArtists = [];
			const artistlength = this.props.state.userReducer.user.favorites.length;
			const artist = this.props.state.userReducer.user.favorites;
			for(let i=0;i<artistlength;i++){
				const artimg = 
				<div key={i} className='img-container'>
					<Link className='artistLink' to={'/artist/' + header(artist[i].artist)}>
						<img className='image col-md-6' src={artist[i].imgurl} />
					</Link>
					<div className='overlay'>
						<span className={'x glyphicon glyphicon-remove image' + artist[i].artist} onClick={this.deleteArtist}/>
						<h3 className='artistheader'>{artist[i].artist}</h3>
					</div>
				</div>
				favoriteArtists.push(artimg);
			}
			return(
				<div>
					<div>
						<h3 className='favArtist' style={{textAlign:'center'}}>{this.props.state.userReducer.user.username + "'s "}Favortie Artists</h3>
						<div>
							{favoriteArtists}
						</div>
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