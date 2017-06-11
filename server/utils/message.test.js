var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var from = 'Marla';
		var text = 'Some message';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({ from, text });
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'Tyler';
		var lat = 15;
		var lon = 19;
		var url = `https://www.google.com/maps/?q=${lat},${lon}`;
		var message = generateLocationMessage(from, lat, lon);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, url});
	});
})