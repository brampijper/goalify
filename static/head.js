$(document).ready(function() {
	$('.container-mainbox').css({ height: $(window).innerHeight() });
	$(window).resize(function(){
		$('.container-mainbox').css({ height: $(window).innerHeight() });
  	})
})

new GMaps({
  div: '#indexMap',
  lat: 52.3702,
  lng: 4.8952
});