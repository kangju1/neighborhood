function hideMarkers(markers){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function showListings(){
	for(var i = 0; i < markers.length; i++){
		markers[i].setMap(map);
		markers[i].setAnimation(google.maps.Animation.DROP);
	}
}

function bounceMarker(id){
	markers.forEach(function(marker){
		if(marker.id == id){
			marker.setAnimation(google.maps.Animation.BOUNCE)
		}else{
			marker.setAnimation(null);
		}
	});
}

function showWithFilter(filterStr){

	filterStr = filterStr.toUpperCase();

	for(var i = 0; i < markers.length; i++){
		if(markers[i].title.toUpperCase().indexOf(filterStr) > -1){
			markers[i].setMap(map);
			markers[i].setAnimation(google.maps.Animation.DROP);
		}else{
			markers[i].setMap(null);
		}
	}
}

function populateInfoWindow(marker) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
    	infoWindow.setContent('');
    	infoWindow.marker = marker;
    	// Set content
    	infoWindow.setContent('<div>' + marker.title + '</div><h4 id="nytHeader">New York Times about this place</h4><ul id="news"></ul>');

    	// NewYork Time Api
    	var nytUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="
                + marker.title + "&api-key=198df5c329024991bd95d8cface1f9cd";

        $.getJSON(nytUrl, function(data){
        	$nytElem = $("#news");
	        var articles = data.response.docs;
	        for (var i = 0; i < articles.length; i++){
	            var article = articles[i];
	            $nytElem.append('<li class="nytarticle">'
	                + '<a href="' + article.web_url + '">' + article.headline.main
	                + '</a>' + '</li>');
	        }
	    }).error(function(e){
	    	$nytHeader = $("#nytHeader");
	        $nytHeader.text("New York Times Articles Could Not Be Found");
	    });

    	// Make sure the marker property is cleared if the infowindow is closed.
    	infoWindow.addListener('closeclick', function() {
    		infoWindow.marker = null;
		});

    	infoWindow.open(map, marker);
    }
}

function sidebarOpen() {
    document.getElementById("mySidebar").style.display = "block";
}


function sidebarClose() {
    document.getElementById("mySidebar").style.display = "none";
}