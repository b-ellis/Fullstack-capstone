import unirest from 'unirest';
import events from 'events';

const getApi = (endpoint) => {
	const emitter = new events.EventEmitter();
	const Request = unirest.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/' + endpoint);
	Request.auth('brad', 'Bushnellcraft', true)
	.end((res) => {
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