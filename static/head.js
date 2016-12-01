$(document).ready(function() {
	  initialize()
	  $(".button-collapse").sideNav();

$('.dog').animate({
    width: '25%'
}, {
    duration: 2000
});

$('.cat').animate({
    width: '75%'
}, {
    duration: 2000
});
	// $('.container-mainbox').css({ height: $(window).innerHeight() });
	// $(window).resize(function(){
	// 	$('.container-mainbox').css({ height: $(window).innerHeight() });
 //  	})
})

function initialize() {
	// var styles = [
 //  	{
	//     featureType: "road",
	//     elementType: "geometry",
	//     stylers: [
	//       { lightness: 100 },
	//       { visibility: "simplified" }
 //    	]
 //  	}
	// ]

	// map.addStyle({
	//     styledMapName:"Styled Map",
	//     styles: styles,
	//     mapTypeId: "map_style"  
	// });

	// map.setStyle("map_style");
    
   var map = new GMaps({
		div: '#indexMap',
		lat: 52.3702,
		lng: 4.8952,
		zoom: 13,
		zoomControl: false,
		panControl: false,
		mapTypeControl: false, 
		streetViewControl: false,
		overviewMapControl: false
	});

	// map.addStyle({
	// 	styledMapName:"Styled Map",
	// 	styles: styles,
	// 	mapTypeId: "map_style"
	// })

	// map.setSTyle("map_style")
}