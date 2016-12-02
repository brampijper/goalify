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

function initialize() {
    
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
}





  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });