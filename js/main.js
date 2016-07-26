var map;

var input;
var autocomplete;

var cityName;
var cityLat;
var cityLon;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 49.2827,
            lng: -123.1207
        },
        zoom: 8
    });

    input = document.getElementById('city-name');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        cityName = place.name;
        cityLat = place.geometry.location.lat();
        cityLon = place.geometry.location.lng();
    });
}

function findTopLocations() {

}





// Smooth Scroll

$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});