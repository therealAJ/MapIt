var map;

var input;
var autocomplete;

var cityName;
var cityLat;
var cityLon;
var location;

//Array of Location Markers
var markers = [];

var resturantMarkers = [];
var clubMarkers = [];
var mallMarkers = [];

//Array of Places Nearby;
var restaurants = [];
var clubs = [];
var malls = [];

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

    emptyList();

    findTopRestaurants(inputLocation);
    findTopNightlife(inputLocation);
    findTopMalls(inputLocation);

    map.setCenter(inputLocation);
    map.setZoom(15);


}

function findTopRestaurants(location) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: location,
        radius: 500,
        type: ['restaurant']
    }, restaurantCallback);

}

function findTopNightlife(location) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: location,
        radius: 500,
        type: ['night_club']
    }, nightLifeCallback);

}

function findTopMalls(location) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: location,
        radius: 500,
        type: ['shopping_mall']
    }, shoppingCallback);

}


function restaurantCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            restaurants.push(results[i].name);
            createMarker(results[i]);
        }
        createRestaurantHtmlList();
    }
}

function nightLifeCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
            clubs.push(results[i].name);
            createMarker(results[i]);
        }
        createNightLifeHtmlList();
    }
}

function shoppingCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
            malls.push(results[i].name);
            createMarker(results[i]);
        }
        createShoppingHtmlList();
    }
}



function createRestaurantHtmlList() {

    var items = [];

    $.each(restaurants, function (i, item) {
        items.push('<li id="' + i + '">' + restaurants[i] + '</li>');
    });

    $('#restaurants').append(items);
}

function createNightLifeHtmlList() {

    var items = [];

    $.each(clubs, function (i, item) {
        items.push('<li id="' + i + '">' + clubs[i] + '</li>');
    });

    $('#night-life').append(items);
}

function createShoppingHtmlList() {

    var items = [];

    $.each(malls, function (i, item) {
        items.push('<li id="' + i + '">' + malls[i] + '</li>');
    });

    $('#malls').append(items);
}


function emptyList() {
    setMapOnAll(null);
    markers = [];
    restaurants = [];
    clubs = [];
    malls = [];
    $('ul').empty();
}

function createMarker(place) {

    var infowindow = new google.maps.InfoWindow();

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

    //    markers.concat(resturantMarkers);
    //    markers.concat(clubMarkers);
    //    markers.concat(mallMarkers);

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