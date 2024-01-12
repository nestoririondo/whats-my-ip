# IP Location Tracker

This is a React application that uses the IPify and RestCountries APIs to fetch and display information about the user's current location.

## Features

- Fetches the user's IP address and location data (country, region, latitude, longitude) using the IPify API.
- Fetches additional information about the user's country (capital, flag, coat of arms, timezones) using the RestCountries API.
- Displays a map centered on the user's location using Leaflet.
- Displays the current date and time in the user's timezone using Luxon.

## Installation

1. Clone this repository: `git clone https://github.com/nestoririondo/whats-my-ip.git`
2. Install the dependencies: `npm install`
3. Create a `.env` file in the root of your project and add your IPify and RestCountries API keys.
4. Start the application: `npm run dev`
