var MarkerModel = function(data){

	this.marker = data;
	this.id = data.id;
	this.title = data.title;

};

var ViewModel = function(){

	var self = this;

	self.filterValue = ko.observable();
	self.markersList = ko.observableArray();
	self.filteredList = ko.observableArray(self.markersList());

	for(var i = 0; i < locations.length; i++){
		self.markersList.push(new MarkerModel(locations[i]));
	}

	self.filterList = function(){

		if(self.filterValue() === undefined){

			self.filteredList(self.markersList());
			hideMarkers(markers);
			showListings(self.filterValue());
			self.filterValue(undefined);

		}else{

			self.filteredList(ko.utils.arrayFilter(self.markersList(), function(marker){
				var filterValue = self.filterValue();
				return marker.title.toUpperCase().indexOf(filterValue.toUpperCase()) > -1;
			}));
			hideMarkers(markers);
			showWithFilter(self.filterValue());
			self.filterValue(undefined);
		}

	};

	self.showFromList = function(listItem){

		bounceMarker(listItem.id);
		markers.forEach(function(marker){
			if(marker.id == listItem.id){
				populateInfoWindow(marker);
			}
		});

	};

};

ko.applyBindings(new ViewModel());