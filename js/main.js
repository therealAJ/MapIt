var map;

var infowindow;

var service;

var input;
var autocomplete;

var cityName;
var cityLat;
var cityLon;
var location;

var markers = [];

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

    infowindow = new google.maps.InfoWindow();

    var inputLocation = {
        lat: cityLat,
        lng: cityLon
    }

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: inputLocation,
        radius: 500,
        type: ['store']
    }, callback);

    setMapOnAll(null);
    markers = [];
    map.setCenter(inputLocation);
    map.setZoom(15);


}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    //add marker to array
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
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