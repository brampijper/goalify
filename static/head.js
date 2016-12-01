var toggled = true;

$('#toggle').click(function() {
    if (toggled) {
        $('.cat').animate({ 'width': '70%' }, 1500);
        toggled = false;
    } else {
        $('.dog').animate({ 'width': '30%' }, 1500);
        toggled = true;
    }    
});