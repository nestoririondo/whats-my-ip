import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [myIP, setMyIP] = useState("");
  const apiKey = import.meta.env.VITE_REACT_APP_IPIFY_API_KEY;

  const getMyIP = async () => {
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`
      );
      console.log(response.data);
      setMyIP(response.data);
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    getMyIP();
  }, []);

  const { ip, location } = myIP;

  return (
    myIP && (
      <>
        <div>{ip}</div>
        <div>{location.country}</div>
        <div>{location.region}</div>
      </>
    )
  );
}

export default App;
