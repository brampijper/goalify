$("document").ready(function () {
	console.log("yaaay works")
})

//initializing google maps with a custom design
function initMap() {

	//set position to center google maps
	var uluru = {lat: 52.3702, lng: 4.8952}

	//create new google maps with options
	var map = new google.maps.Map(document.getElementById('map'), {
		disableDefaultUI: true,
		zoom: 12,
		center: uluru
    })

	//ask browser location from user
    var infoWindow = new google.maps.InfoWindow({map: map});

    // if user accepts show location
    if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position) {
    		var pos = {
    			lat: position.coords.latitude,
    			lng: position.coords.longitude
            }

            infoWindow.setPosition(pos)

            //creates a marker with the current location
            infoWindow.setContent('You are here:)')
            map.setCenter(pos)

        }, () => {
        	handleLocationError(true, infoWindow, map.getCenter());
          })
    } 
	else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
    }
}

//if the browser doesn't suppoert geolocation than the user can't use this functionality.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}

