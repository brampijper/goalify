//initializing google maps with a custom design
function initMap() {

    //set position to center google maps
	var mainPosition = {lat: 52.3702, lng: 4.8952}

	//create new google maps with options
	var map = new google.maps.Map(document.getElementById('map'), {
		disableDefaultUI: true,
		zoom: 12,
		center: mainPosition
    })

    var infoWindow = new google.maps.InfoWindow({map: map});

    $.getJSON('/json/goals.json', function(goal) {
        $.each(goal, function(key, data) {
            var latLng = new google.maps.LatLng(data.lat, data.lng)
                //Creating a marker and putting it on the map. 
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.title
            })

            var contentString = 'Goal: ' + data.title + '<br>' + '<br>' + 'Description: ' + data.description + '<br><br>' + 'Duration: ' + data.duration + ' minutes' + '<br><br>' + 'Points: ' + data.points + '<br><br>' + 'Difficulty: ' + data.difficulty

            var infowindow = new google.maps.InfoWindow() 

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString)
                infowindow.open(map, marker);
            })
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
            })  
        })
    })

    // When user accepts show location
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