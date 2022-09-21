// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);


// CREATE THE LINE: Coordinates for each point to be used in the line.(in a one-dimensional array)
// Coordinates for each point to be used in the polyline.
let line = [
    [37.6213, -122.3790], 
    [40.797951, -112.000893], 
    [30.1975, -97.6664], 
    [43.6777, -79.6248], 
    [40.641312, -73.778137]
  ];

  // Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "yellow"
  }).addTo(map);



// CALL the REMOTE ARRAY: Get data from cities.js
let cityData = cities;

// Add markes for MULTIPLE locations (object array containing each city's location, state, and population).
//object array can be included here or in a separate file

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
});

// MAPBOX: Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,    
    id: "light-v10",  
    accessToken: API_KEY
});

// Then add 'graymap' tile layer to the map.
streets.addTo(map);