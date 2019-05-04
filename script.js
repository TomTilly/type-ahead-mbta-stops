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
	const matchedStops = [];
	for(let i = 0; i < stops.length; i++){
		if(stops[i].match(stopToMatch)){
			matchedStops.push(stops[i]);
			if(matchedStops.length === 10){
				return matchedStops;
			}
		}
	}
	return matchedStops;
	// Old version - searched through entire 8500+ element array. Discarded for performance reasons
	// return stops.filter((stop) => {
	// 	return stop.match(regex);
	// });
}

function displayMatches(){
	if(this.value){
		const regex = new RegExp(this.value, 'gi');
		const matchArray = findMatches(regex, stops);
		if(matchArray.length){
			const html = matchArray.map(stop => {
			const stopName = stop.replace(regex, `<span class="hl">$&</span>`);
				return `<li>${stopName}</li>`;
			}).join('');
			suggestions.innerHTML = html;	
		}
	} else {
		suggestions.innerHTML = '';
	}
}

searchInput.addEventListener('input', displayMatches);