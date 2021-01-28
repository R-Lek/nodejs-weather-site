const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=1f6a92f93a6dd191c6156b8205bf41b1&units=f&query=${latitude},${longitude}`;

	request({ url, json: true }, (error, {body}) => {
		if (error) {
			callback('Unable to connect to location services. Please check your internet.');
		} else if (body.error) {
			callback('Unable to find your location, try another search.');
		} else {
			callback(undefined, `${body.current.weather_descriptions[0]}. ${body.current.temperature} degrees outside, but it feels like ${body.current.feelslike} degrees outside.`);
		}
	});
}

module.exports = forecast;