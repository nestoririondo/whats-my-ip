import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DateTime } from "luxon";

import "./App.css";

function App() {
  const [myLocation, setMyLocation] = useState("");
  const [locationData, setLocationData] = useState("");

  const ipifyApiKey = import.meta.env.VITE_REACT_APP_IPIFY_API_KEY;
  const countrylayerApiKey = import.meta.env
    .VITE_REACT_APP_COUNTRYLAYER_API_KEY;

  const getMyLocation = async () => {
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyApiKey}`
      );
      setMyLocation(response.data);
      console.log(response.data);
    } catch {
      console.log("Error");
    }
  };

  const getLocationData = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      setLocationData(response.data);
      console.log(response.data);
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    getMyLocation();
    getLocationData();
  }, []);

  if (!myLocation) return null;
  if (!locationData) return null;

  const {
    ip,
    location: { country, region, lat, lng },
  } = myLocation;

  const countryData = locationData.filter((thisCountry) => {
    return thisCountry.cca2 === country;
  });
  console.log(countryData);

  const { capital, name, flag, coatOfArms, timezones } = countryData[0];

  const today = DateTime.now().setZone(timezones[0]).toFormat("MM-dd-yyyy");
  const now = DateTime.now().setZone(timezones[0]).toFormat("HH:mm");

  console.log(today);
  console.log(now);

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${coatOfArms.png})` }}
    >
      <div className="app">
        <div className="map">
          <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="info">
          <div className="ip-address">{ip}</div>
          <div>
            You are in {region}, {country} {flag}
          </div>
          <div className="country-info">
            <h1>{name.common}</h1>
            <h2>Capital: {capital}</h2>
          </div>
          <div className="today-info">
            <h2>Today is: {today}</h2>
            <h2>
              Currently it's {now} in {region}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
