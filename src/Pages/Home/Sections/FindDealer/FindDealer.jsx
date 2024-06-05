import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlass } from "@phosphor-icons/react";
const dealers = [
  { id: 1, name: "Dealer One", position: [33.888629, 35.495479] }, // Beirut
  { id: 2, name: "Dealer Two", position: [34.005738, 35.648437] }, // Jounieh
  { id: 3, name: "Dealer Three", position: [33.273804, 35.203808] }, // Sidon
  { id: 4, name: "Dealer Four", position: [34.43667, 35.83617] }, // Tripoli
  // Add more dealers as needed
];

const initialPosition = [33.888629, 35.495479]; // Default map center

const DealerLocator = () => {
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [nearestDealer, setNearestDealer] = useState(null);
  const [mapCenter, setMapCenter] = useState(initialPosition);

  useEffect(() => {
    if (nearestDealer) {
      setMapCenter(nearestDealer.position);
    } else if (userLocation) {
      setMapCenter(userLocation);
    } else {
      setMapCenter(initialPosition);
    }
  }, [nearestDealer, userLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };

  const handleSearch = () => {
    // Check if the search term matches a dealer name
    const matchedDealer = dealers.find(
      (dealer) => dealer.name.toLowerCase() === location.toLowerCase()
    );

    if (matchedDealer) {
      setNearestDealer(matchedDealer);
      setUserLocation(null); // Clear user location as we are searching by dealer name
    } else {
      // Fall back to geocoding if no dealer matches the name
      geocodeByAddress(location)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setUserLocation([lat, lng]);
          let nearest = null;
          let minDistance = Infinity;

          dealers.forEach((dealer) => {
            const distance = calculateDistance(
              lat,
              lng,
              dealer.position[0],
              dealer.position[1]
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearest = dealer;
            }
          });

          setNearestDealer(nearest);
        })
        .catch((error) => console.error("Error", error));
    }
  };

  return (
    <div className="relative z-[0]">
      <div className="absolute w-auto top-0 left-1/2 mt-10 -translate-x-1/2 h-auto z-[100] ">
        <h2 className="text-4xl text-primary rb-bold text-center ">
          Find Dealer Near You
        </h2>
      </div>
      <div className="flex justify-center absolute left-1/2 -translate-x-1/2 bottom-0 w-auto h-auto z-[100]">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter dealer name or your location"
          className="border w-[28rem] rounded-l px-4 py-3"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white rounded-r px-4 py-3 text-2xl"
        >
          <MagnifyingGlass />
        </button>
      </div>
      <MapContainer
        center={mapCenter}
        zoom={10}
        style={{
          height: "60vh",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {dealers.map((dealer) => (
          <Marker key={dealer.id} position={dealer.position}>
            <Popup>{dealer.name}</Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {nearestDealer && (
          <Marker position={nearestDealer.position}>
            <Popup>Nearest Dealer: {nearestDealer.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default DealerLocator;
