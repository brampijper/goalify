var map, userLocation, mainPosition = {lat: 52.3702, lng: 4.8952}, map;
var distance;

//initializing google maps with a custom design
function initMap() {
    
    var styledMapType = new google.maps.StyledMapType(

   [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"on"},{"color":"#00858a"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"saturation":"-45"},{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f6ebcb"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#f7f1df"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f3dd9d"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#f8a179"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#e6dcbd"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#3dbbc2"}]}],
    {name: 'Styled Map'});

	//create new google maps with options
	map = new google.maps.Map(document.getElementById('map'), {
		disableDefaultUI: true,
		zoom: 12,
		center: mainPosition
    })

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({ 'map': map });
    var infowindow = new google.maps.InfoWindow() 

    $.getJSON('/json/goals.json', function(goal) {
        $.each(goal, function(key, data) {
            var latLng = new google.maps.LatLng(data.lat, data.lng)
                //Creating a marker and putting it on the map. 
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.title,
                animation: google.maps.Animation.DROP,
                icon: {
                    path: MAP_PIN
                },
                map_icon_label: '<span class="map-icon map-icon-point-of-interest></span>'
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
                infowindow.open(map, this);

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
     google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter((document.body.offsetWidth<1104)
                    //<1104
                  ? mainPosition
                    //>=1104
                  : mainPosition
              );
    });

    google.maps.event.trigger(window, 'resize')



    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map'); 
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
