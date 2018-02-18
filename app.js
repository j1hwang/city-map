var locations = [
	{title: 'Disneyland', location: {lat: 35.6329007, lng: 139.8782003}, selected: null}, // attractions
	{title: 'Tokyo Tower', location: {lat: 35.6585848, lng: 139.7432389}, selected: null},
	{title: 'Odaiba Statue of Liberty', location: {lat: 35.6298089, lng: 139.7618991}, selected: null},
	{title: 'City Hall Tower', location: {lat: 35.6892506, lng: 139.6896613}, selected: null},

	{title: 'Gonpachi', location: {lat: 35.6572753, lng: 139.7045559}, selected: null}, // restaurants
	{title: 'Tsujihan', location: {lat: 35.6651728, lng: 139.7434675}, selected: null},
	{title: 'Isen Honten', location: {lat: 35.6615181, lng: 139.6863567}, selected: null},

	{title: 'Sinjuku Gyoen', location: {lat: 35.6851806, lng: 139.7078577}, selected: null}, // parks
	{title: 'Yoyogi Park', location: {lat: 35.6717403, lng: 139.6927507}, selected: null},
	{title: 'Ueno Park', location: {lat: 35.666489, lng: 139.7349774}, selected: null},

	{title: 'Senso-ji', location: {lat: 35.7147689, lng: 139.7947563}, selected: null}, // temples
	{title: 'Meiji Shrine', location: {lat: 35.6764019, lng: 139.6971319}, selected: null},

	{title: 'Tsukiji Market', location: {lat: 35.664944, lng: 139.770136}, selected: null}, // shoppings
	{title: 'Harajuku Street', location: {lat: 35.6711042, lng: 139.7024456}, selected: null},
	{title: 'Roppongi Hills', location: {lat: 35.6604681, lng: 139.7270547}, selected: null},
];

let chosen = [];
let full = [];
for(let i = 0; i < locations.length; i++) full.push(i);

let map;
let markers = [];
// Function to initialize the map within the map div
function initMap(arr=full) {

	const styledMapType = new google.maps.StyledMapType(
		[
			{elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
			{elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
			{elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
			{
				featureType: 'administrative',
				elementType: 'geometry.stroke',
				stylers: [{color: '#c9b2a6'}]
			},
			{
				featureType: 'administrative.land_parcel',
				elementType: 'geometry.stroke',
				stylers: [{color: '#dcd2be'}]
			},
			{
				featureType: 'administrative.land_parcel',
				elementType: 'labels.text.fill',
				stylers: [{color: '#ae9e90'}]
			},
			{
				featureType: 'landscape.natural',
				elementType: 'geometry',
				stylers: [{color: '#dfd2ae'}]
			},
			{
				featureType: 'poi',
				elementType: 'geometry',
				stylers: [{color: '#dfd2ae'}]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{color: '#93817c'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry.fill',
				stylers: [{color: '#a5b076'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{color: '#447530'}]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{color: '#f5f1e6'}]
			},
			{
				featureType: 'road.arterial',
				elementType: 'geometry',
				stylers: [{color: '#fdfcf8'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [{color: '#f8c967'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{color: '#e9bc62'}]
			},
			{
				featureType: 'road.highway.controlled_access',
				elementType: 'geometry',
				stylers: [{color: '#e98d58'}]
			},
			{
				featureType: 'road.highway.controlled_access',
				elementType: 'geometry.stroke',
				stylers: [{color: '#db8555'}]
			},
			{
				featureType: 'road.local',
				elementType: 'labels.text.fill',
				stylers: [{color: '#806b63'}]
			},
			{
				featureType: 'transit.line',
				elementType: 'geometry',
				stylers: [{color: '#dfd2ae'}]
			},
			{
				featureType: 'transit.line',
				elementType: 'labels.text.fill',
				stylers: [{color: '#8f7d77'}]
			},
			{
				featureType: 'transit.line',
				elementType: 'labels.text.stroke',
				stylers: [{color: '#ebe3cd'}]
			},
			{
				featureType: 'transit.station',
				elementType: 'geometry',
				stylers: [{color: '#dfd2ae'}]
			},
			{
				featureType: 'water',
				elementType: 'geometry.fill',
				stylers: [{color: '#b9d3c2'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{color: '#92998d'}]
			}
		],
		{name: 'Styled Map'}
	);

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 35.6894875, lng: 139.69170639999993},
		zoom: 12,
		mapTypeControl: false
	});

	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');

    let largeInfoWindow = new google.maps.InfoWindow();
    let bounds = new google.maps.LatLngBounds();

    for(let i = 0; i < locations.length; i++) {
    	let position = locations[i].location;
    	let title = locations[i].title;
    	let marker = new google.maps.Marker({
    		position: position,
    		title: title,
    		animation: google.maps.Animation.DROP,
    		id: i
    	});

    	markers.push(marker);
    	marker.addListener('click', function() {
    		populateInfoWindow(this, largeInfoWindow);
    	});
    }
    
    for (let i = 0; i < markers.length; i++) {
    	if(!arr.includes(i)) continue;
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

    function populateInfoWindow(marker, infowindow) {
    	if(infowindow.marker != marker) {
    		infowindow.marker = marker;
    		infowindow.setContent('<div>' + marker.title + '</div>');
          	infowindow.open(map, marker);
        
          	// Make sure the marker property is cleared if the infowindow is closed.
          	infowindow.addListener('closeclick', function() {
            	infowindow.marker = null;
        	});
    	}
    }
}


var viewModel = {
	self: this,

	locationList: ko.observableArray(locations),
	currentLocation: ko.observable(''),
	query: ko.observable(''),

	setLocation: function(clickedLocation) {

		currentLocation = clickedLocation;
		for (let i = 0; i < viewModel.locationList().length; i++) {
        	if(viewModel.locationList()[i].title === self.currentLocation.title){

        		let idx = chosen.indexOf(i);
        		(idx === -1) ? chosen.push(i) : chosen.splice(idx, 1);

        		$(`li:nth-child(${i+1})`).toggleClass('selected');
        		break;
        	}
        }
        (chosen.length === 0)? initMap() : initMap(chosen);
	},

	search: function(value) {

		chosen = [];
		viewModel.locationList([]);

		for (let i = 0; i < locations.length; i++) {
			if(locations[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				viewModel.locationList.push(locations[i]);
				if(value !== '')
					chosen.push(i);
			}
		}
		(chosen.length === 0)? initMap() : initMap(chosen);
	}
}

viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel);
