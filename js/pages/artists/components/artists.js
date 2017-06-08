import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Glyphicon,Button} from 'react-bootstrap'

import actions from '../actions/index';
import { storeArtist } from '../../search/actions/index';


class Artists extends React.Component {
	constructor(){
		super();
	}
	componentDidMount(){
		// console.log('artist');
	}
	render(){
		const header = (name) => {
			if(/\s/.test(name)){
				name = name.replace(/\s+/g, '%20');
				return name;
			} else {
				return name;
			}
		}
		const artist = this.artist;
		let playlist;
		let related = [];
		let star = <span style={{padding:'7px 0 0 6px', cursor:'pointer', color:this.props.starcolor}} className='glyphicon glyphicon-star-empty' aria-hidden="true" onClick={this.props.saveArtist}/>;
		for(let i=0; i<this.props.favorites.length; i++){
			if(this.props.favorites[i].artist !== this.props.artists){
				star = star;
			} else {
				star = <span style={{padding:'7px 0 0 6px', cursor:'pointer', color:'gold'}} className='glyphicon glyphicon-star-empty' aria-hidden="true" onClick={this.props.deleteArtist}/>
			}
		}
		// 	const Playlist = art.uri;
		// 	// playlist = <iframe src={"https://embed.spotify.com/?uri=" + Playlist} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>
			const relatedArtists = this.props.related;
			for(let i = 0; i<relatedArtists.length; i++){
				const item = 
				<li className='col-md-3' key={i}>
					<Link to={'/artist/' + header(relatedArtists[i].name)} onClick={this.props.storeArtist}>
						<p className={relatedArtists[i].name + ' well well-md'}>{relatedArtists[i].name}</p>
					</Link>
				</li>
				related.push(item);
			}
			const artistInfo = this.props.artistInfo.content.split('<')[0];
			const info = <p className='bio pre-scrollable'>{artistInfo}</p>
		return(
			<div>
				<div>
					<div className='title-container' style={{textAlign:'center'}}>
						<div className='imgContainer'>
							<img className='artistImg' width='400px' src={this.props.image} />
						</div>
						<div className='namebiocontainer'>
							<div className='nameContainer'>
								<h1>{this.props.name}</h1>
								<h3>{star}</h3>
							</div>
							<div className='bio-div'>
								{info}
								<a className='official' href={this.props.officialUrl}>Official Website</a>
							</div>
						</div>
					</div>
				</div>
				{playlist}
				<div>
					<h3 className='relatedName' style={{textAlign:'center'}}>Related Artists</h3>
					<ul>
						{related}
					</ul>
				</div>
			</div>
		)
	}
}

module.exports = Artists;