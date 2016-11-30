var map, userLocation, mainPosition = {lat: 52.3702, lng: 4.8952}, map;
var distance;

//initializing google maps with a custom design
function initMap() {

	//create new google maps with options
	map = new google.maps.Map(document.getElementById('map'), {
		disableDefaultUI: true,
		zoom: 12,
		center: mainPosition
    })

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({ 'map': map });

    $.getJSON('/json/goals.json', function(goal) {
        $.each(goal, function(key, data) {
            var latLng = new google.maps.LatLng(data.lat, data.lng)
                //Creating a marker and putting it on the map. 
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.title
            })

            var circle = new google.maps.Circle({
                map: map,
                radius: 200,
                strokeOpacity: 0.7,
                strokeWeight: 1,
                fillOpacity: 0.35,
                fillColor: '#F44336'
            })
            circle.bindTo('center', marker, 'position')

            var infowindow = new google.maps.InfoWindow() 

            google.maps.event.addListener(marker, 'click', function() {
                distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation.position, marker.position)
                var contentString = 
                    'Goal: ' + data.title + '<br><br>' + 
                    'Description: ' + data.description + '<br><br>' + 
                    'Duration: ' + data.duration + ' minutes' + '<br><br>' + 
                    'Points: ' + data.points + '<br><br>' + 
                    'Difficulty: ' + data.difficulty + '<br><br>' + 
                    "<a href='goal-overview?id="+ data.id + "&distance=" + distance + "'>Complete Goal</a>" + '<br><br>' +
                    "<a id='showRoute' href='#'> Show Route</a>" + '<br><br>' +
                    "<div id='travel_time'></div>"

                infowindow.setContent(contentString)
                infowindow.open(map, marker);

                $('#showRoute').click(function(){ 
                    var request = {
                        origin: latLng,
                        destination: userLocation.position,
                        travelMode: google.maps.TravelMode.BICYCLING
                    }
                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setOptions({ 
                                suppressMarkers: true,
                                suppressBicyclingLayer: true 
                            })
                            directionsDisplay.setDirections(response);
                            var point = response.routes[0].legs[0];
                            $( '#travel_time').html( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ') '); 
                        }
                    })  
                })
            })
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
            })  
        })

    })

     $.getJSON('/json/finishedGoals.json', function(goal) {
        $.each(goal, function(key, data) {
            var latLng = new google.maps.LatLng(data.lat, data.lng)
                //Creating a marker and putting it on the map. 
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.title,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            })

            var contentString = 'Finished Goalsss You received points for this yooo' 


            var infowindow = new google.maps.InfoWindow() 

            google.maps.event.addListener(marker, 'click', function() {
                var contentString = 'Completed Goal: ' + data.title + '<br><br>' + 'Description: ' + data.description + '<br><br>' + 'You received: ' + data.points + ' points for this goal'
                infowindow.setContent(contentString)
                infowindow.open(map, marker);
            })
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
            })  
        })
    })
}


function setCurrenPosition(pos) {
    // marker for userLocation
    userLocation = new google.maps.Marker({
       map : map,
       position : new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
       icon : "images/location-marker.png"
    })
    var circle = new google.maps.Circle({
        map: map,
        radius: 350,
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillOpacity: 0.25,
        fillColor: '#2196F3'
    })
    circle.bindTo('center', userLocation, 'position')
    
    // scroll to userLocation
    map.panTo(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude))
}

    function displayAndWatch(position) {
        console.log('Yaay i run')
        //set current pos
        setCurrenPosition(position)
        // console.log(position)
        //watch position
        watchCurrentPosition()
    }

    function watchCurrentPosition() {
        console.log('Yaaay i run  as well')
        var positionTimer = navigator.geolocation.watchPosition(function(position) {
                setMarkerPosition(userLocation,position)
                map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
            })
    }

    function setMarkerPosition(marker, position) {
        console.log('yaaay i run tooo')
        marker.setPosition( new google.maps.LatLng(position.coords.latitude,position.coords.longitude))
    }

    function locError(error) {
        // the current position could not be located
        alert("The current position could not be found!");
    }

function initLocationProcedure() {
    initMap()
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError, {enableHighAccuracy: true})
    } else {
        alert('Sorry, your browser does not support the Geolocation')
    }
}

$(document).ready(function() {
    initLocationProcedure();
});
