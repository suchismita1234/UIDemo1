function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);

        document.getElementById('submit').addEventListener('click', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });

        // document.getElementById('waypoints').addEventListener('change', function() {
        //   calculateAndDisplayRoute(directionsService, directionsDisplay);
        // });
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // var waypts = [];
    // var checkboxArray = document.getElementById('waypoints');
    // for (var i = 0; i < checkboxArray.length; i++) {
    //     if (checkboxArray.options[i].selected) {
    //     waypts.push({
    //         location: checkboxArray[i].value,
    //         stopover: true
    //     });
    //     }
    // }

    getUrlVars();
    var OriginPlace = getUrlVars()["org"].replace(/%20/g, " ");
    var DestPlace = getUrlVars()["des"].replace(/%20/g, " ");
    
    directionsService.route({
        // origin: document.getElementById('start').value,
        // destination: document.getElementById('end').value,
        origin: OriginPlace,
        destination: DestPlace,
        //waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
        directionsDisplay.setDirections(response);
        
        var route = response.routes[0];//.legs[0]

        // var time = 'Estimated travel time: ' + route.duration.text;
        // var distance =  'Estimated distance: ' + route.distance.text;
        document.getElementById('start'). value = OriginPlace;
        document.getElementById('end'). value = DestPlace;

        var listDetails = document.getElementById('listDetails');
        listDetails.innerHTML = '';
        listDetails.innerHTML = '<li class="list-group-item">' + route.legs[0].start_address + '</li><li class="list-group-item">' + route.legs[0].end_address + '</li><li class="list-group-item">' + route.legs[0].duration.text + '</li><li class="list-group-item">' + route.legs[0].distance.text + '</li><li class="list-group-item cost">&#2352; 24,718 - &#2352; 77,160</li>' ;
        
        
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
            console.log(route.legs[0]);
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<h4>Route Segment: ' + routeSegment +
              '</h4>';
          summaryPanel.innerHTML += '<ul class="list-group directionsList"><li class="list-group-item or">From: ' + route.legs[i].start_address + '</li><li class="list-group-item de">To: ' + route.legs[i].end_address + '</li><li class="list-group-item di">Distance: ' + route.legs[i].distance.text + '</li></ul>' ;
        //   summaryPanel.innerHTML += route.legs[i].start_address + ' to <br>';
        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
        } else {
        window.alert('Directions request failed due to ' + status);
        }
    });
}