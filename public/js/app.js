const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
	fetchCall(location);
});

fetchCall = (address) => {
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = ''; 
	fetch(`/weather?address=${address}`).then((response) => {
		response.json().then(({error, location, forecast}) => {
			if (error) {
				messageOne.textContent = error;
			} else {
				messageOne.textContent = location;
				messageTwo.textContent = forecast;
			}
		});
	});
};