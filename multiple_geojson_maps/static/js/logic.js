// Add console.log to check to see if our code is working.
console.log("working");


// 1. CREATE TWO MAP STYLES

// Add a standard view tile layer (MAPBOX)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
 	id: 'mapbox/streets-v11',
 	accessToken: API_KEY
 });


// Add a dark view tile layer (MAPBOX)
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
 	id: 'mapbox/dark-v10',
 	accessToken: API_KEY
 });

 // 2. BUILD THE BASE LAYER

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};


// 3. DEFINE THE DEFAULT SETTINGS OF THE MAP

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})


// 4. ADD THE TOGGLE LAYER CONTROLS TO THE MAP 

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// 5. ADD THE DATA FILE TO BE MAPPED 

// Accessing the airport GeoJSON URL from personal github acct
let airportData = "https://raw.githubusercontent.com/speddings/mapping_earthquakes/main/majorAirports.json";


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);

// 6. ADD THE POPUP LABELS TO THE DATA 

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2><hr><hr3>" + "Airport name: " + feature.properties.name + "</h3>")
    }
  }).addTo(map);
});