const endpoint = 'https://api-v3.mbta.com/stops';
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
let stops;

fetch(endpoint)
	.then(resp => resp.json())
	.then(respData => {
		stops = respData.data.map(stop => stop.attributes.name);
	});

function findMatches(stopToMatch, stops){
	return stops.filter((stop) => {
		const regex = new RegExp(stopToMatch, 'gi');
		return stop.match(regex);
	});
}

function displayMatches(){
	if(this.value){
		const matchArray = findMatches(this.value, stops);
		const html = matchArray.map(stop => {
			const regex = new RegExp(this.value, 'gi');
			const stopName = stop.replace(regex, `<span class="hl">$&</span>`);
			return `<li>${stopName}</li>`;
		}).join('');
		suggestions.innerHTML = html;	
	} else {
		suggestions.innerHTML = '';
	}
}

searchInput.addEventListener('input', displayMatches);