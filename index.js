const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).send('City is required');
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: process.env.API_KEY,
                query: city
            }
        });

        const { temperature, weather_descriptions, humidity,
            wind_speed,
            pressure,
            visibility,
            feels_like} = response.data.current;
        res.json({
            city,
            temperature,
            description: weather_descriptions[0],
            humidity,
            wind_speed,
            pressure,
            visibility,
            feels_like,
            
        });
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});