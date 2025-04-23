const express = require('express');
const router = express.Router();
const db = require('../database');
const axios = require('axios');
const apiKey = '42f60dd279e8af008fb2be88ea719e7d'; 
let city = '';

router.post('/get-city', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }

    const query = 'SELECT city FROM users WHERE email = ?';
    
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No cities found for this user' });
        }

        city = results[0].city;
        res.json({ city });
    });
});


router.post('/city-details', async (req, res) => {
    
  if (city) {
    apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  } else {
    return res.status(400).json({ error: 'City or coordinates are required' });
  }

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    const weatherDetails = {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      condition: weatherData.weather[0].description,
      visibility: weatherData.visibility,
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
      windSpeed: weatherData.wind.speed,
      windGust: weatherData.wind.gust,
      cloudiness: weatherData.clouds.all,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
    };

    // Send details to frontend if fetched successfully
    res.status(200).json(weatherDetails);

  } catch (err) {
    console.error('Error details:', err.response ? err.response.data : err.message);
    res.status(500).send('Session Expired!');
  }
});

module.exports = router;

