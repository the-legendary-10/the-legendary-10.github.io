var userLocation = undefined;




$(document).on("pagecreate","#main-page",function(){
    var map = null; 
	var userLocation = null; //Location which will be used for lunch-date calculation
	var deviceLocation = null; //Device location
	var chosenLocation = null; //Location chosen by user
	
	//set pin for own location
	var myLocPin = null;
	
	//initialize map
    GetMap();
	var mapHeight = document.documentElement.clientHeight * 0.9;
	$( "#mapDiv" ).height(mapHeight);

	var mapWidth = document.documentElement.clientWidth * 0.7;
	$( "#mapDiv" ).width(mapWidth);
	
	//disable radio buttons (will be enabled, if specific location is available
	$("#locationRadios1").attr("disabled", true);
	$("#locationRadios2").attr("disabled", true);	
	
});

function GetMap() { 
            /* Replace YOUR_BING_MAPS_KEY with your own credentials. 
            Obtain a key by signing up for a developer account at 
            http://www.microsoft.com/maps/developers/ */ 
        var cred = "Ak4YyNZDcqdffzA8v6abqlO_tlEhDs4ZK30zbET6AP9tTXokOsVX0E4FtaJEyAUB"; 
		
        // Initialize map 
        map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), 
				{ credentials: cred });
		Microsoft.Maps.Events.addHandler(map, 'click',getLatlng );	
		
        // Check if browser supports geolocation 
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
        } 
        else { 
            alert('Entschuldigung, Geolocation wird in deinem Browser aktuell nicht unterstützt.'); 
			$("#locationRadios1").attr("disabled", true);
        } 
    } 

    // Successful geolocation 
    function locateSuccess(loc) { 
        // Set the user's location 
        deviceLocation = new Microsoft.Maps.Location(loc.coords.latitude, loc.coords.longitude); 
		userLocation = deviceLocation;
		
        // Zoom in on user's location on map 
        map.setView({ center: userLocation, zoom: 13 });
            // Add a pin to the center of the map
            var pin = new Microsoft.Maps.Pushpin(userLocation, {text: '1'}, { draggable: false});
            map.entities.push(pin);
			
		//enable "Gerätestandort" radio button and check it	
		if (($("#locationRadios1").attr("disabled", true))) {
			$("#locationRadios1").attr("disabled", false);	
			$("#locLabel1").removeClass("read-only-list");
		}
		$("#locationRadios1").trigger("click");
		
        // Draw circle of area where user is located 		
        var locationArea = drawCircle(userLocation); 
        map.entities.push(locationArea);
    } 
	
    // Unsuccessful geolocation 
    function locateFail(geoPositionError) { 
		$("#locationRadios1").attr("disabled", true);
        switch (geoPositionError.code) { 
            case 0: // UNKNOWN_ERROR 
                alert('Ein unbekannter Fehler ist aufgetreten, sorry.'); 
                break; 
            case 1: // PERMISSION_DENIED 
                alert('Die Erlaubnis zur Standortbestimmung wurde verweigert.'); 
                break; 
            case 2: // POSITION_UNAVAILABLE 
                alert('Position zur Zeit nicht verfügbar...'); 
                break; 
            case 3: // TIMEOUT 
                alert('Die Standortbestimmung hat zu lange gedauert und es ist ein Timeout aufgetreten.'); 
                break; 
            default: 
				break;
        } 
		
		// Zoom in on Germany on map 
		// Set default location 
        defaultLocation = new Microsoft.Maps.Location(50.9802538, 10.3156194); 
        map.setView({ center: defaultLocation, zoom: 8 });
    }
    // Draw blue circle on top of user's location 
    function drawCircle(loc) { 
        var radius = 100; 
        var R = 6378137; 
        var lat = (loc.latitude * Math.PI) / 180; 
        var lon = (loc.longitude * Math.PI) / 180; 
        var d = parseFloat(radius) / R; 
        var locs = new Array(); 
        for (x = 0; x <= 360; x++) { 
            var p = new Microsoft.Maps.Location(); 
            brng = x * Math.PI / 180; 
            p.latitude = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng)); 
            p.longitude = ((lon + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(p.latitude))) * 180) / Math.PI; 
            p.latitude = (p.latitude * 180) / Math.PI; 
            locs.push(p); 
        } 
        return new Microsoft.Maps.Polygon(locs, { fillColor: new Microsoft.Maps.Color(125, 0, 0, 255), strokeColor: new Microsoft.Maps.Color(0, 0, 0, 255) }); 
    } 
	
	function getLatlng(e) { 
	//set own location if user wants to change location or if location could not be determined
        if (e.targetType == "map") {
			var point = new Microsoft.Maps.Point(e.getX(), e.getY());
            var locTemp = e.target.tryPixelToLocation(point);
			if (myLocPin !== null){
				map.entities.pop();
			}
			
			//set location to the location chosen by the user
			chosenLocation = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);
			userLocation = chosenLocation;
			
			//enable "Selbstgewählter Standort" radio button and check it
			if (($("#locationRadios2").attr("disabled", true))) {
				$("#locationRadios2").attr("disabled", false);	
				$("#locLabel2").removeClass("read-only-list");
			}
			$("#locationRadios2").trigger("click");
			
			//add new pin for location chosen by user
            var myLocPin = new Microsoft.Maps.Pushpin(userLocation, {text: '2'}, {'draggable': false});
            map.entities.push(myLocPin);

        }              
    }
	
	//radio button clicked
	function switchLocation(locationRadio) {
		//"Gerätestandort" radio button
		if (locationRadio.value == 1) {
			if (deviceLocation !== null && deviceLocation !== undefined) {
				userLocation = deviceLocation;
				//locationRadio.checked = true;
				$("#locationRadios1").prop('checked', true).checkboxradio('refresh');
				$("#locationRadios1").attr("checked",true).checkboxradio("refresh");
			}
		}
		//"Selbstgewählter Standort" radio button
		if (locationRadio.value == 2) {
			if (chosenLocation !== null){
				userLocation = chosenLocation;				
				$("#locationRadios2").attr("checked",true).checkboxradio("refresh");				
				$("#locationRadios2").prop('checked', true).checkboxradio('refresh');
			}
		}
	}
	
	//getLocation to pass current location to backend
	function getLocation() {
		return userLocation;
	}
	
//resize Map on orientation change	
function resizeMap() {
	var mapHeight = document.documentElement.clientHeight * 0.9;
	$( "#mapDiv" ).height(mapHeight);

	var mapWidth = document.documentElement.clientWidth * 0.7;
	$( "#mapDiv" ).width(mapWidth);
}
	
