const endpoint = 'https://api-v3.mbta.com/stops';
let stops;

fetch(endpoint)
	.then(resp => resp.json())
	.then(respData => {
		stops = respData.data.map(stop => stop.attributes.name);
		console.log(stops);
	});

function findMatches(stopToMatch, stops){
	return stops.filter(stop => {
		const regex = new RegExp(stopToMatch, 'gi');
		return stop.match(regex);
	});
}