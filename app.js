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
			: hamburger.css('left', '80%');
	}
	e.stopPropagation;
});

body.click(function(e) {
	if(!($(e.target).is('#hamburger') || $(e.target).is('#nav'))){
		if(body.width() < 1025) {
			nav.hide();
			title.show();
			hamburger.css('left', '2%');
		}
	}
});


var map;
// Function to initialize the map within the map div
function initMap() {

	var styledMapType = new google.maps.StyledMapType(
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
		center: {lat: 37.566535, lng: 126.97796919999996},
		zoom: 14,
		mapTypeControlOptions: {
			mapTypeIds: ['']
			//'roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
		}
	});

	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');

	// Create a single latLng literal object.
	var singleLatLng = {lat: 37.566535, lng: 126.97796919999996};

	marker = new google.maps.Marker ({
		map: map,
		position: singleLatLng,
		title: 'i am here!!',
		animation: google.maps.Animation.DROP,
	});

	var infowindow = new google.maps.InfoWindow();

	marker.addListener('click', function() {
		infowindow.marker = this;
		infowindow.setContent('<div>' + this.title + '</div>');
		infowindow.open(map, this);
	});
}