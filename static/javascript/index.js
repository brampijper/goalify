$(document).ready(function() {
	  initialize()
	  $(".button-collapse").sideNav();

	$('.dog').animate({
    	width: '25%'
	}, {duration: 2000})

	$('.cat').animate({
    	width: '75%'
	}, {duration: 2000})
})

var map, userLocation, mainPosition = {lat: 52.3702, lng: 4.8952}, map;

function initialize() {
	map = new google.maps.Map(document.getElementById('indexMap'), {
		disableDefaultUI: true,
		zoom: 13,
		center: mainPosition,
		zoomControl: false,
		mapTypeControl: false, 
		streetViewControl: false,
		overviewMapControl: false,
		scrollwheel: false,
    	navigationControl: false,
    	mapTypeControl: false,
    	scaleControl: false,
    	draggable: false
    })

    var marker = new google.maps.Marker({
	    position: mainPosition,
	    map: map,
	    title: "lala",
	    animation: google.maps.Animation.DROP

	})

	var infowindow = new google.maps.InfoWindow() 
	infowindow.setContent("Explore Interesting Attractions in your city!")
    
	setTimeout(function() {
		infowindow.open(map, marker);
	}, 1200)

	// var marker = new google.maps.Marker({
	// 	map:map,
	// 	lat: 52.3702,
	// 	lng: 4.8952,
	// 	animation: google.maps.Animation.DROP
	// 	// icon: {
	// 	// 	path: SQUARE.PIN
	// 	// },
	// 	// map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
	// })
	// // infowindow = new google.maps.InfoWindow();
	// // infowindow.setContent("lalalla")
 // //    infowindow.open(map);
}