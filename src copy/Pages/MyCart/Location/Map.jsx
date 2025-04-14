import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ onSelectingAddress }) => {
  const markerRef = useRef(null); // Reference to store the current marker

  useEffect(() => {
    // Initialize the map
    const map = L?.map("map")?.setView([33.8547, 35.8623], 8); // Centered on Zahle, Lebanon

    // Add a tile layer (OpenStreetMap in this case)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Define the custom icon
    const customIcon = L.icon({
      iconUrl: "../../../assests/brand-1.png", // Replace with your icon URL
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Anchor point of the icon (e.g., bottom center)
    });

    // Function to add a marker and fetch the location name
    const addMarker = async (e) => {
      const { lat, lng } = e.latlng;

      // Remove the existing marker if it exists
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Add a new marker on the map at the clicked location with the custom icon
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      markerRef.current = marker; // Store the reference to the marker

      // Fetch the location name using reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      // Display the location name
      const locationName = data.display_name;
      onSelectingAddress(locationName);
    };

    // Attach the click event to the map
    map.on("click", addMarker);

    // Cleanup on component unmount
    return () => {
      map.off("click", addMarker);
      map.remove();
    };
  }, []);

  return <div id="map" style={{ flex: 1 }}></div>;
};

export default MapComponent;
