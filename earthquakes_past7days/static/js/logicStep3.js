// LogicStep3 - ADD CONDITIONAL COLORS TO MARKERS AND POPUP INFO  STEPS 7-12

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
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	maxZoom: 18,
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


// 7. ADD STYLE TO THE MARKERS - COLOR, SIZE, ETC.
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.

// 10. ADD FUNCTION TO FILLCOLOR TO INCORPORATE MULTIPLE COLORS 
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}


// 11. PART OF FILLCOLOR - DEFINE THE COLORS (CONDITIONAL)
// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}


// 8. PART OF STYLING - SET MARKER SIZE TO MAGNITUDE (RADIUS)
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// 5. ADD EARTHQUAKE DATA TO MAP 
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {

  // 6. CHANGE THE MAP MARKERS TO CIRCLES
  // We turn each feature into a circleMarker on the map.
  
  pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
          },
  // 9. ADD STYLE FUNCTION TO MAP DISPLAY
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,

    // 12. ADD POPUP INFO CARDS TO MAP DISPLAY
    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(map);
});