const express = require('express');
const axios = require('axios');
const router = express.Router(); // Use router for routing
const db = require('../database');
const apiKey = '42f60dd279e8af008fb2be88ea719e7d'; 

router.post('/', async (req, res) => {
    const { city, lat, lon } = req.body; // Getting from frontend

    let apiUrl = '';
    if (city) {
        apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    } else if (lat && lon) {
        apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    } else {
        return res.status(400).json({ error: 'City or coordinates are required' });
    }

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        const weatherDetails = {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            condition: weatherData.weather[0].description,
            visibility: weatherData.visibility,
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon
        };

        // Send details to frontend if fetched successfully
        res.status(200).json(weatherDetails);

    } catch (err) {
        console.error('Error details:', err.response ? err.response.data : err.message);
        res.status(500).send('Unable to fetch weather data for the selected location');
    }
});

// Save weather data to the database
router.post('/save', async (req, res) => {
    const { city, lat, lon } = req.body;
    const email = req.session.email; // Retrieve email from session

    console.log('Session in /save route:', req.session); // Debug session
  
    if (!email) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    let apiUrl = '';
    if (city) {
        apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    } else if (lat && lon) {
        apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    } else {
        return res.status(400).json({ error: 'City or coordinates are required' });
    }

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        const weatherDetails = {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            condition: weatherData.weather[0].description,
            visibility: weatherData.visibility,
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon
        };

        // Save weather data to the database
        const query = `
            INSERT INTO weather (email, city, visibility, latitude, longitude, temperature, humidity, \`condition\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                temperature = VALUES(temperature), 
                humidity = VALUES(humidity), 
                \`condition\` = VALUES(\`condition\`), 
                visibility = VALUES(visibility), 
                time_stamp = CURRENT_TIMESTAMP;
        `;

        const values = [
            email, 
            weatherDetails.city,  
            weatherDetails.visibility,
            weatherDetails.lat,
            weatherDetails.lon,
            weatherDetails.temperature,
            weatherDetails.humidity,
            weatherDetails.condition 
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error saving weather data:', err);
                res.status(500).send('Error saving weather data.');
            } else {
                res.status(201).send('Weather data saved successfully.');
                console.log('!!! Weather Data Saved in Database !!!');
            }
        });

    } catch (err) {
        console.error('Error details:', err.response ? err.response.data : err.message);
        res.status(500).send('Unable to fetch weather data for the selected location');
    }
});

module.exports = router;
