var map, userLocation, mainPosition = {lat: 52.3702, lng: 4.8952}, map;

//initializing google maps with a custom design
function initMap() { 

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

            var contentString = 'Goal: ' + data.title + '<br>' + '<br>' + 'Description: ' + data.description + '<br><br>' + 'Duration: ' + data.duration + ' minutes' + '<br><br>' + 'Points: ' + data.points + '<br><br>' + 'Difficulty: ' + data.difficulty + '<br><br>' + '<a href="goal-overview?id='+ data.id + '"  /> Complete Goal' 


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
                infowindow.setContent(contentString)
                infowindow.open(map, marker);
            })
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
            })  
        })
    })



 //    // When user accepts show location
 //    if (navigator.geolocation) {
 //    	navigator.geolocation.watchPosition(function(position) {
 //    		var pos = {
 //    			lat: position.coords.latitude,
 //    			lng: position.coords.longitude
 //            }

 //            infoWindow.setPosition(pos)

 //            //creates a marker with the current location
 //            infoWindow.setContent('You are here:)')
 //            map.setCenter(pos)

 //        }, () => {
 //        	handleLocationError(true, infoWindow, map.getCenter());
 //          })
 //    } 
	// else {
 //          // Browser doesn't support Geolocation
 //          handleLocationError(false, infoWindow, map.getCenter());
 //    }
}

// //if the browser doesn't suppoert geolocation than the user can't use this functionality.
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// 	infoWindow.setPosition(pos);
// 	infoWindow.setContent(browserHasGeolocation ?
// 		'Error: The Geolocation service failed.' :
// 		'Error: Your browser doesn\'t support geolocation.');
// }

function setCurrenPosition(pos) {
    // marker for userLocation
    userLocation = new google.maps.Marker({
           map : map,
           position : new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
           title : "You are here",
           icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
       })
    // scroll to userLocation
    // map.panTo(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude))
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
        marker.setPosition( new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
            )
    }

    function locError(error) {
        // the current position could not be located
        alert("The current position could not be found!");
    }

function initLocationProcedure() {
    initMap()
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError)
    } else {
        alert('Sorry, your browser does not support the Geolocation')
    }
}

$(document).ready(function() {
    initLocationProcedure();
});