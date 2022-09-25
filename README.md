# Mapping Earthquakes

## Overview
The purpose of this project is to create a website that visually shows the differences between the magnitudes of earthquakes all over the world for the last seven days.


## Resources
1. Software: 
   1. JavaScript
   2. libraries: D3 and leaflet
   3. geoJSON
   4. Mapbox API
   5. HTML 5

2. Data Sources:
   1. Earthquake [geoJSON file](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
   2. Tectonic Plates [geoJSON file](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)
   3. Major Earthquakes [geoJSON file](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson)


## Mapping Earthquake Results
The interactive map includes many features:
1. Retrieves and displays the geographical coordinates and the magnitudes of earthquakes. 
2. Three map styles: street view, satalite view and a dark view.  
3. Three map layers that can be turned off/on by the user: All earthquakes, tectonic plate lines. and earthquakes with a magnitude greater than 5.
4. A legend is provided that shows the color correlation to the earthquake magnitude. 

![world-map](/earthquake_challenge/images/world-map.png)
