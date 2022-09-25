// Add console.log to check to see if our code is working.
console.log("working");


// 1. CREATE TWO MAP STYLES
// Add a standard view tile layer (MAPBOX)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	maxZoom: 3,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
 	id: 'mapbox/streets-v11',
 	accessToken: API_KEY
 });


// Add a dark view tile layer (MAPBOX)
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	maxZoom: 3,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
 	id: 'mapbox/satellite-streets-v11',
 	accessToken: API_KEY
 });

// 2. BUILD THE BASE LAYER
// Create a base layer that holds both maps.
let baseMaps = {
  "Street": streets,
  "Satellite Streets": satelliteStreets
};


// 3. DEFINE THE DEFAULT SETTINGS OF THE MAP
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});


// 4. ADD THE TOGGLE LAYER CONTROLS TO THE MAP 
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// 5. ADD EARTHQUAKE DATA TO MAP 
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});
