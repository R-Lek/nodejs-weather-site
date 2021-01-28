const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
	res.render('index',
		{
			title: 'Weather',
			name: 'Rorschach'
		});
});

app.get('/about', (req, res) => {
	res.render('about',
		{
			title: 'About',
			name: 'Rorschach'
		});
});

app.get('/help', (req, res) => {
	res.render('help',
		{
			title: 'Help',
			name: 'Rorschach',
			helpMessage: 'Please state the nature of your emergency.'
		});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide a address.'
		})
	}
	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({
				error
			});
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}
			return res.send({
				location,
				forecast: forecastData,
				address: req.query.address
			});
		})
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}
	res.send({
		products: []
	})
});

// 404 Help page
app.get('/help/*', (req, res) => {
	res.render('404',
	{
		errorMessage: 'Help article not found',
		title: '404',
		name: 'Rorschach'
	});
});

// 404 page
app.get('*', (req, res) => {
	res.render('404',
	{
		errorMessage: 'Page was not found',
		title: '404',
		name: 'Rorschach'
	});
});

app.listen(port, () => {
	console.log(`Server is up! Port: ${port}`);
});