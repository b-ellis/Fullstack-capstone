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
		console.log('artist');
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
		let artistImage = <img src={this.props.image} />;
		let playlist;
		let related = [];
		// 	const Playlist = art.uri;
		// 	// playlist = <iframe src={"https://embed.spotify.com/?uri=" + Playlist} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
			const relatedArtists = this.props.related;
			for(let i = 0; i<relatedArtists.length; i++){
				const item = 
				<li key={i}>
					<Link to={'/artist/' + header(relatedArtists[i].name)} onClick={this.props.storeArtist}>
						<p className={relatedArtists[i].name}>{relatedArtists[i].name}</p>
					</Link>
				</li>
				related.push(item);
			}
		return(
			<div>
				<div>
					<h1>{this.props.name}</h1>
					<Button>Favorite</Button>
				</div>
				<img src={this.props.image} />
				{playlist}
				<ul>
					{related}
				</ul>
			</div>
		)
	}
}

module.exports = Artists;