//Initial locations
var locations = [
        {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}, id: 0},
        {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}, id: 1},
        {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}, id: 2},
        {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}, id: 3},
        {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}, id: 4},
        {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}, id: 5}
   	];

var markers = [];

var map;

var infoWindow;

function initMap() {
	// Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      	center: {lat: 40.7413549, lng: -73.9980244},
      	zoom: 13,
      	mapTypeControl: false
    });

    infoWindow = new google.maps.InfoWindow();

    for(var i = 0; i < locations.length; i++) {
    	// Get the position from the location array.
	    var position = locations[i].location;
	    var title = locations[i].title;
	    var id = locations[i].id;
	    // Create a marker per location, and put into markers array.
	    var marker = new google.maps.Marker({
	    	map: map,
	      	position: position,
	      	title: title,
	      	animation: google.maps.Animation.DROP,
	      	id: id
	    });
	    // Push the marker to our array of markers.
	    markers.push(marker);
	    // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
        	bounceMarker(this.id);
          	populateInfoWindow(this);
        });
	}
}