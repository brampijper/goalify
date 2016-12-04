$(document).ready(function() {
	
	//Running Google map functions when page is loaded
	initialize()
	drop()

	//materialize sidebar nav (mobile)
	$(".button-collapse").sideNav();

	//Scrolling to second page on the index page
	$(".img-container").click(function() {
    $('html, body').animate({
        scrollTop: $(".container-secondbox").offset().top}, 'slow');
	});

	//Check's if the user is looking at the progress bar 
	$(window).scroll(function() {
	    let y_scroll_pos = window.pageYOffset;
	    let scroll_pos_test = 550;             

	    if(y_scroll_pos > scroll_pos_test) {
	    	 setTimeout(function() {
	       	$('.dog').animate({
	    		width: '25%'
			}, {duration: 2500})

			$('.cat').animate({
	    		width: '75%'
			}, {duration: 2500})
	       }, 1000)
	    }
	})
})

//global var for Google Maps
let map;
let mainPosition = {lat: 52.3702, lng: 4.8952};
let infowindow1 = new google.maps.InfoWindow() 
let infowindow2 = new google.maps.InfoWindow() 
let markers = []
let pointOfInterests = [
    {lat: 52.358172, lng: 4.868300},
    {lat: 52.381627, lng: 4.901176},
    {lat: 52.367438, lng: 4.895367}
]

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

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter((document.body.offsetWidth<1104)
                    //<1104
                  ? mainPosition
                    //>=1104
                  : mainPosition
              );
    });

    google.maps.event.trigger(window, 'resize')
}

function drop() {
	for (var i = 0; i < pointOfInterests.length; i++) {
		addMarkerWithTimeout(pointOfInterests[i], i * 300)
	}
}

function addMarkerWithTimeout(position, timeout) {
	window.setTimeout(function() {
		markers.push(new google.maps.Marker({
			position: position,
			map: map,
			animation: google.maps.Animation.DROP
		}))
	}, timeout)
	    
	setTimeout(function() {
		infowindow1.setContent("Explore Interesting Attractions in your city!")
		infowindow1.open(map, markers[2]);
	}, 1200)

	setTimeout(function() {
	infowindow2.setContent('<a href="register"> Register</a>' + " now and receive your first 10 points!")
	infowindow2.open(map, markers[1]);
	}, 3000)
}