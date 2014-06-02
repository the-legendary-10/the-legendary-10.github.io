$(document).on("pagecreate","#main-page",function(){
    var map = null; 
    GetMap()
});
function GetMap() { 
            /* Replace YOUR_BING_MAPS_KEY with your own credentials. 
            Obtain a key by signing up for a developer account at 
            http://www.microsoft.com/maps/developers/ */ 
        var cred = "Ak4YyNZDcqdffzA8v6abqlO_tlEhDs4ZK30zbET6AP9tTXokOsVX0E4FtaJEyAUB"; 
        // Initialize map 
        map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), 
           { credentials: cred }); 
        // Check if browser supports geolocation 
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
        } 
        else { 
            alert('I\'m sorry, but Geolocation is not supported in your current browser.'); 
        } 
    } 

    // Successful geolocation 
    function locateSuccess(loc) { 
        // Set the user's location 
        var userLocation = new Microsoft.Maps.Location(loc.coords.latitude, loc.coords.longitude); 
        // Zoom in on user's location on map 
        map.setView({ center: userLocation, zoom: 17 }); 
        // Draw circle of area where user is located 
        var locationArea = drawCircle(userLocation); 
        map.entities.push(locationArea);
    } 
    // Unsuccessful geolocation 
    function locateFail(geoPositionError) { 
        switch (geoPositionError.code) { 
            case 0: // UNKNOWN_ERROR 
                alert('An unknown error occurred, sorry'); 
                break; 
            case 1: // PERMISSION_DENIED 
                alert('Permission to use Geolocation was denied'); 
                break; 
            case 2: // POSITION_UNAVAILABLE 
                alert('Couldn\'t find you...'); 
                break; 
            case 3: // TIMEOUT 
                alert('The Geolocation request took too long and timed out'); 
                break; 
            default: 
        } 
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
