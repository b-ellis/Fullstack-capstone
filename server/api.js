import unirest from 'unirest';
import events from 'events';

const getApi = (endpoint, args) => {
	const auth = new Buffer.from('ba59bb1f29f74df98ad54622df9524db:ec7906777ab347cfb4b4dc9bfd63c8cd', 'ascii').toString('base64');
	const base = 'Basic ' + auth;
	const emitter = new events.EventEmitter();
	const request = unirest.post('https://accounts.spotify.com/api/token').send({
		grant_type : 'client_credentials',
	});
	request.headers({
		Authorization: base
	})
	.end((res) => {
		if(res.ok) {
			if(endpoint === 'artists'){
				endpoint = 'artists/' + args + '/related-artists';
			}
			const Request = unirest.get('https://api.spotify.com/v1/' + endpoint).qs(args)
			Request.headers({
				Authorization: 'Bearer ' + res.body.access_token
			})
			.end((response) => {
				if(response.ok) {
					emitter.emit('end', response.body);
				}
				else {
					emitter.emit('error', response.code);
				}
			});
		}
	});
	return emitter;
}

const getLastApi = (args) => {
	const emitter = new events.EventEmitter();
	unirest.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&format=json')
	.qs(args)
	.end((res) => {
		if(res.ok) {
			emitter.emit('end', res.body);
		} else {
			emitter.emit('error', res.code);
		}
	});
	return emitter;
}

const getGoogleSearch = (artist) => {
	const emitter = new events.EventEmitter();
	unirest.get('https://www.googleapis.com/customsearch/v1?').qs({
		q: 'official ' + artist + ' music',
		cx: '004651962465610952147:ruimjmnfvq4',
		key: 'AIzaSyCYmc5R8dS36A3K2PsqyFZaroo9OVIiaS8' 
	})
	.end((res) => {
		if(res.ok) {
			emitter.emit('end', res.body);
		} else {
			emitter.emit('error', res.code);
		}
	});
	return emitter;
}


exports.getApi = getApi;
exports.getLastApi = getLastApi;
exports.getGoogleSearch = getGoogleSearch;