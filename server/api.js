import unirest from 'unirest';
import events from 'events';

const getApi = (endpoint, args) => {
	const emitter = new events.EventEmitter();
	// const Request = unirest.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/' + endpoint);
	// Request.auth('brad', 'Bushnellcraft', true)
	const Request = unirest.get('https://api.spotify.com/v1/' + endpoint).qs(args)
	Request.end((res) => {
		if(res.ok) {
			emitter.emit('end', res.body);
		}
		else {
			emitter.emit('error', res.code);
		}
	});
	return emitter;
}

exports.getApi = getApi;