import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sunny icon
import CloudIcon from '@mui/icons-material/Cloud'; // Cloud icon
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Snow icon
import FlashOnIcon from '@mui/icons-material/FlashOn'; // Thunderstorm icon
import GrainIcon from '@mui/icons-material/Grain'; // Windy icon
import UmbrellaIcon from '@mui/icons-material/Umbrella'; // Rain icon

function WeatherComponent() {
    const [weatherData, setWeatherData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [city, setCity] = useState('Toronto'); // Default city is Toronto

    useEffect(() => {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, [city]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setCity(searchTerm);
    };

    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case 'Clear':
                return <WbSunnyIcon />;
            case 'Clouds':
                return <CloudIcon />;
            case 'Snow':
                return <AcUnitIcon />;
            case 'Thunderstorm':
                return <FlashOnIcon />;
            case 'Windy':
                return <GrainIcon />;
            case 'Rain':
                return <UmbrellaIcon />;
            default:
                return <GrainIcon />;
        }
    };

    const getBackgroundStyle = () => {
        if (!weatherData) return { background: 'lightgrey' };
        
        const condition = weatherData.weather[0].main;
        switch (condition) {
            case 'Clear':
                return { background: 'skyblue' };
            case 'Clouds':
                return { background: 'lightgrey' };
            case 'Snow':
                return { background: 'whitesmoke' };
            case 'Thunderstorm':
                return { background: 'darkslategray' };
            case 'Windy':
                return { background: 'lightcyan' };
            case 'Rain':
                return { background: 'darkblue' };
            default:
                return { background: 'lavender' };
        }
    };
    
    return (
        <div style={getBackgroundStyle()}>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter a city"
                />
                <button type="submit">Search</button>
            </form>

            {weatherData && (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Weather in {weatherData.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {weatherData.main.temp.toFixed(1)}°C
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {weatherData.weather[0].main}
                        </Typography>
                        <Typography variant="body2">
                            {weatherData.weather[0].description}
                        </Typography>
                        {getWeatherIcon(weatherData.weather[0].main)}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default WeatherComponent;