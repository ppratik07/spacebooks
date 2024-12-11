import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    // Initialize the map with specified dimensions and zoom control disabled
    const map = L.map('map', {
      zoomControl: false
    }).setView([51.505, -0.09], 13);

    // Define the bounds for the image overlay
    const bounds = [
      [51.49, 0.1],  // Adjust these to match your image’s top-left corner coordinates
      [51.51, 0.01]  // Adjust these to match your image’s bottom-right corner coordinates
    ];

    // Add the office layout image overlay
    const imageOverlay = L.imageOverlay('/officemap.PNG', bounds).addTo(map);
    map.fitBounds(bounds);

    // Calculate the center of the image overlay
    const imageCenter = L.latLngBounds(bounds).getCenter();

    // Custom icon for the markers
    const customIcon = L.icon({
      iconUrl: 'path/to/your/icon.png', // Replace with your icon path
      iconSize: [38, 38],
      iconAnchor: [19, 19],
      popupAnchor: [0, -20]
    });

    // Add a marker at the center of the image overlay
    L.marker(imageCenter, { icon: customIcon })
      .addTo(map)
      .bindPopup('Central desk');

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '80vw', // Adjust width and height as needed
        height: '80vh',
        margin: '0 auto', // Center the map horizontally
        border: '1px solid #ddd',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.2)'
      }}
    />
  );
};

export default MapComponent;
