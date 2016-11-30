var map, userLocation, mainPosition = {lat: 52.3702, lng: 4.8952}, map;

//initializing google maps with a custom design
function initMap() { 

	//create new google maps with options
	map = new google.maps.Map(document.getElementById('map'), {
		disableDefaultUI: true,
		zoom: 12,
		center: mainPosition
    })

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
}


function setCurrenPosition(pos) {
    // marker for userLocation
    userLocation = new google.maps.Marker({
       map : map,
       position : new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
       title : "You are here",
       icon : "images/location-marker.png"
    })
    var circle = new google.maps.Circle({
        map: map,
        radius: 200,
        strokeOpacity: 0.7,
        strokeWeight: 1,
        fillOpacity: 0.15,
        fillColor: '##A0C6D9'
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
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError)
    } else {
        alert('Sorry, your browser does not support the Geolocation')
    }
}

$(document).ready(function() {
    initLocationProcedure();
});