$(document).ready(function() {
  $(".menuButton").on("click", function(){
      $(".navbar-default-home").addClass("slideIn");
  });
    $(".navbar-default-home").find(".navbar-brand").on("click", function(e){
        e.preventDefault();
      $(".navbar-default-home").removeClass("slideIn");
  });

//   $('.multiselect-ui').multiselect({
//                 includeSelectAllOption: true
//     });

  $("#findOptions").on("click",function(){
    var OValue= $("#start").val();
    var DValue= $("#end").val();
    if(OValue == '' || OValue == undefined || OValue == null && DValue == '' || DValue == undefined || DValue == null){
        $("#start").siblings('span.errorMsg').css('visibility', 'visible');
        $("#end").siblings('span.errorMsg').css('visibility', 'visible');
    }
    else if(OValue == '' || OValue == undefined || OValue == null){
        $("#start").siblings('span.errorMsg').css('visibility', 'visible');
    }
    else if(DValue == '' || DValue == undefined || DValue == null){
        $("#end").siblings('span.errorMsg').css('visibility', 'visible');
    }
    else {
        location.href= "routes.html?org=" + OValue + "&des=" + DValue;
    } 
  });

  $(".input100").on('focus', function(){
    $("#start").siblings('span.errorMsg').css('visibility', 'hidden');
    $("#end").siblings('span.errorMsg').css('visibility', 'hidden');
  });
});

function initMapAutoComplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: {lat: 41.85, lng: -87.65}
        });
        //directionsDisplay.setMap(map);
        new AutocompleteDirectionsHandler(map);
}

function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    var originInput = document.getElementById('start');
    var destinationInput = document.getElementById('end');
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput, {placeIdOnly: true});
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, {placeIdOnly: true});

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
}

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
        }
        if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
        } else {
        me.destinationPlaceId = place.place_id;
        }
    });
};