import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DateTime } from "luxon";
import "../App.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function Map() {
  const [myLocation, setMyLocation] = useState("");
  const [locationData, setLocationData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const ipifyApiKey = import.meta.env.VITE_REACT_APP_IPIFY_API_KEY;

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyApiKey}`
      );
      setMyLocation(response.data);
      try {
        const countryResponse = await axios.get(
          `https://restcountries.com/v3.1/alpha/${response.data.location.country}`
        );
        setLocationData(countryResponse.data);
      } catch {
        console.log("Error fetching country data");
      }
    } catch {
      console.log("Error fetching location data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const {
    ip,
    location: { country, region, lat, lng },
  } = myLocation;

  const { capital, name, flag, coatOfArms, timezones } = locationData[0];

  const today = DateTime.now().setZone(timezones[0]).toFormat("MM-dd-yyyy");
  const now = DateTime.now().setZone(timezones[0]).toFormat("HH:mm");

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${coatOfArms.png})` }}
    >
      <div className="app">
        <div className="map">
          <MapContainer center={[lat, lng]} zoom={10} scrollWheelZoom={true}>
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

export default Map;
