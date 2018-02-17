// Responsive parts
const body = $('body');
const hamburger = $('#hamburger');
const nav = $('#nav');
const title = $('#title');

hamburger.click(function(e) {
	nav.toggle();
	title.toggle();
	if(body.width() > 750){
		(hamburger.position().left > body.width()*0.1)
			? hamburger.css('left', '2%')
			: hamburger.css('left', '60%');
	} else {
		(hamburger.position().left > body.width()*0.1)
			? hamburger.css('left', '2%')
			: hamburger.css('left', '70%');
	}
	e.stopPropagation;
});

body.click(function(e) {
	if(!($(e.target).is('#hamburger') 
		|| $(e.target).is('#nav') 
		|| $(e.target).is('li')
		|| $(e.target).is('input')
	)){
		if(body.width() < 1008) {
			nav.hide();
			title.show();
			hamburger.css('left', '2%');
		}
	}
});
// Responsive parts (end)

$('input').on('input', function() {
	chosen = [];
	$('li').removeClass('selected');
	for(let i = 0; i < locations.length; i++) {
		if(!locations[i].title.toLowerCase().includes($('input').val())) {

			locations[i].selected = null;
			continue;
		}
		locations[i].selected = true;
		chosen.push(i); // ternary ////////////////////////////////////////////
	}
	//for(let i = 0; i < locations.length; i++) console.log(locations[i].selected);

	initMap(chosen);
});



let map;
let markers = [];
let chosen = [];
let locations = [
	{title: 'Disneyland', location: {lat: 35.6329007, lng: 139.8782003}, selected: true}, // attractions
	{title: 'Tokyo Tower', location: {lat: 35.6585848, lng: 139.7432389}, selected: true},
	{title: 'Odaiba Statue of Liberty', location: {lat: 35.6298089, lng: 139.7618991}, selected: true},
	{title: 'City Hall Tower', location: {lat: 35.6892506, lng: 139.6896613}, selected: true},

	{title: 'Gonpachi', location: {lat: 35.6572753, lng: 139.7045559}, selected: true}, // restaurants
	{title: 'Tsujihan', location: {lat: 35.6651728, lng: 139.7434675}, selected: true},
	{title: 'Isen Honten', location: {lat: 35.6615181, lng: 139.6863567}, selected: true},

	{title: 'Sinjuku Gyoen', location: {lat: 35.6851806, lng: 139.7078577}, selected: true}, // parks
	{title: 'Yoyogi Park', location: {lat: 35.6717403, lng: 139.6927507}, selected: true},
	{title: 'Ueno Park', location: {lat: 35.666489, lng: 139.7349774}, selected: true},

	{title: 'Senso-ji', location: {lat: 35.7147689, lng: 139.7947563}, selected: true}, // temples
	{title: 'Meiji Shrine', location: {lat: 35.6764019, lng: 139.6971319}, selected: true},

	{title: 'Tsukiji Market', location: {lat: 35.664944, lng: 139.770136}, selected: true}, // shoppings
	{title: 'Harajuku Street', location: {lat: 35.6711042, lng: 139.7024456}, selected: true},
	{title: 'Roppongi Hills', location: {lat: 35.6604681, lng: 139.7270547}, selected: true},
];
let full = [];
for(let i = 0; i < locations.length; i++)
	full.push(i);


// Function to initialize the map within the map div
var initMap = function(arr=full) {

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

    // function hideListings() {
    //     for (var i = 0; i < markers.length; i++) {
    //     	markers[i].setMap(null);
    //     }
    // }
}


let ViewModel = function() {
	let self = this;

	this.locationList = ko.observableArray([]);

	locations.forEach(function(location) {
		self.locationList.push(new Location(location));
	});

	this.currentLocation = ko.observable(self.locationList()[0]);

	self.setLocation = function(clickedLocation) {

		if($('input').val() !== '') {
			chosen = [];
			$('input').val('');
		} 

		self.currentLocation = clickedLocation;
		for (let i = 0; i < locations.length; i++) {
        	if(locations[i].title === self.currentLocation.title()){

        		let idx = chosen.indexOf(i);

        		(idx === -1) ? chosen.push(i) : chosen.splice(idx, 1);
        		$(`li:nth-child(${i+1})`).toggleClass('selected');
        		
        		break;
        	}
        }
        (chosen.length === 0)? initMap() : initMap(chosen);
	}
}


let Location = function(data) {
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.selected = ko.observable(data.selected);
}

let VM = new ViewModel();

//VM.

ko.applyBindings(VM);