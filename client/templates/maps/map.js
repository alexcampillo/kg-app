// Template.map.rendered = function(){

// 	var loadDefaultData = function() {
// 		Tracker.autorun(function(){
// 			var currentLocation = Stops.findOne({"current": true}, {fields: {"latitude": 1, "longitude": 1}});

// 			if(currentLocation) {
// 				Meteor.setTimeout(function() {
// 					setUserLocation(currentLocation.latitude, currentLocation.longitude)
// 				}, 500);
// 			}
// 		});
// 	}

// 	var setUserLocation = function(latitude, longitude) {
// 		var location = L.latlng(latitude, longitude);
// 		map.panTo(location);
// 		marker.setLatLng(location);
// 	}

	
// 	L.mapbox.accessToken = "pk.eyJ1IjoiYWxleC1jYW1waWxsbyIsImEiOiJMdzE1SEZrIn0.0RA1exO6gXynBCaZdqQRhQ";

// 	var map = L.mapbox.map('map', 'alex-campillo.90847674', {
// 		zoom: 3,
// 		minZoom: 3,
// 		maxZoom: 6
// 	}).on('ready', loadDefaultData());

// 	var mapIcon = L.icon({
// 		iconUrl: '/shipping-box.svg',
// 		iconSize: [48, 48]
// 	});

// 	var marker = L.marker([0, 0], {
// 		icon: mapIcon
// 	}).addTo(map);
// };
