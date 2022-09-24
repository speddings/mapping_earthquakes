// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// Add a tile layer (MAPBOX)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
 	id: 'mapbox/streets-v11',
 	accessToken: API_KEY
 }).addTo(map);




// add 'streets' tile layer to the map
// streets

// Accessing the airport GeoJSON URL from personal github acct
let airportData = "https://raw.githubusercontent.com/speddings/mapping_earthquakes/main/majorAirports.json";


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2><hr><hr3>" + "Airport name: " + feature.properties.name + "</h3>")
    }
  }).addTo(map);
});