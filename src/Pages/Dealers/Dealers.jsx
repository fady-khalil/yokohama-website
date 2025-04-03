import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlass, MapPin, Phone } from "@phosphor-icons/react";
import Container from "Components/Container/Container";
import image from "assests/Auth/2.jpg";
const Dealers = () => {
  const dealers = [
    {
      id: 1,
      name: "Dealer One",
      position: [33.888629, 35.495479],
      location:
        "M.Howyek SARL - An HMG holding company address: Jounieh Highway, Dama center",
      number: "+961 9 911311",
      image: image,
    }, // Beirut
    {
      id: 2,
      name: "Dealer Two",
      position: [34.005738, 35.648437],
      location:
        "M.Howyek SARL - An HMG holding company address: Jounieh Highway, Dama center",
      number: "+961 9 911311",
      image: image,
    }, // Jounieh
    {
      id: 3,
      name: "Dealer Three",
      position: [33.273804, 35.203808],
      location:
        "M.Howyek SARL - An HMG holding company address: Jounieh Highway, Dama center",
      number: "+961 9 911311",
      image: image,
    }, // Sidon
    {
      id: 4,
      name: "Dealer Four",
      position: [34.43667, 35.83617],
      location:
        "M.Howyek SARL - An HMG holding company address: Jounieh Highway, Dama center",
      number: "+961 9 911311",
      image: image,
    }, // Tripoli
    // Add more dealers as needed
  ];

  const initialPosition = [33.888629, 35.495479];

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
    <main>
      <Container>
        <div className="my-secondary text-center text-3xl rb-bold">
          <h1>Dealers</h1>
        </div>
        <div className="relative">
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
          <div className="flex justify-center absolute left-1/2 -translate-x-1/2 top-20 w-auto h-auto z-[100]">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter dealer name or your location"
              className="border lg:w-[28rem] rounded-l px-4 py-3"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white rounded-r px-4 py-3 text-2xl"
            >
              <MagnifyingGlass />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-10 my-secondary ">
          {dealers?.map(({ name, location, number, image }, index) => (
            <div
              key={index}
              className="bg-dark flex flex-col lg:flex-row items-center border-t-[4px] border-primary"
            >
              <div className="flex-1 p-4 lg:p-10">
                <p className="text-2xl rb-bold text-white border-b border-[#ccc] pb-2">
                  {name}
                </p>

                <div className="flex items-center text-white gap-x-4 mt-6">
                  <MapPin size={28} />
                  <p className="rb-bold text-sm flex-1  lg:w-1/2">{location}</p>
                </div>
                <div className="flex items-center text-white gap-x-4 mt-6">
                  <Phone size={28} />
                  <p className="rb-bold text-sm w-1/2">{number}</p>
                </div>

                <button className="text-primary underline text-sm mt-6">
                  GET DIRECTIONS
                </button>
              </div>
              <div className="flex-1 ">
                <img src={image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Dealers;
