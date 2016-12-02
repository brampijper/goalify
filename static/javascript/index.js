$(document).ready(function() {
	initialize()
	$(".button-collapse").sideNav();
})

$(".next").click(function() {
       $('html,body').animate({ scrollTop:$('.container-secondbox').parent().next().offset().top}, 'slow');
});

$(window).scroll(function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = 550;             

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
});

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