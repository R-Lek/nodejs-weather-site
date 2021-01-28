const request = require('postman-request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm9yc2NoYWNoLWluayIsImEiOiJja2puMGpzczYxMWVpMzBtanhtbDltNXQyIn0.DoDcW_2uNFLxHqMzLjaBLA&limit=1`;
	request({ url, json: true }, (error, {body}) => {
		if (error) {
			// You call the callback (which is called in app.js) en give it 2 arguments.)
			callback('Unable to connect to location services. Please check your internet.', undefined);
		} else if (body.features.length === 0) {
 			callback('Unable to find your location, try another search.', undefined);
		} else {
			callback(undefined, {
				longitude: body.features[0].center[0],
		 		latitude: body.features[0].center[1],
		 		location: body.features[0].place_name
			})
		}
	});
}

module.exports = geocode;