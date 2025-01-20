import React, { useState } from 'react';
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {
    // API Configuration
    const API_CONFIG = {
        key: 'e31eafebdb2489db26c5bc853ac8b689',
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        lang: 'es'
    };

    // State Management
    const [weatherData, setWeatherData] = useState({
        current: null,
        forecast: null
    });
    const [uiState, setUiState] = useState({
        loading: false,
        error: null,
        lastSearched: ''
    });

    // API URLs
    const getApiUrl = (endpoint, city) => 
        `${API_CONFIG.baseUrl}/${endpoint}?appid=${API_CONFIG.key}&lang=${API_CONFIG.lang}&q=${encodeURIComponent(city)}`;

    // Fetch Data Helper
    const fetchWeatherData = async (url, errorMessage) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || errorMessage);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`${errorMessage}: ${error.message}`);
        }
    };

    // Main Location Handler
    const handleLocationSearch = async (city) => {
        setUiState(prev => ({
            ...prev,
            loading: true,
            error: null,
            lastSearched: city
        }));

        try {
            // Fetch both weather and forecast data in parallel
            const [currentWeather, forecast] = await Promise.all([
                fetchWeatherData(
                    getApiUrl('weather', city),
                    'Error al obtener el clima actual'
                ),
                fetchWeatherData(
                    getApiUrl('forecast', city),
                    'Error al obtener el pronóstico'
                )
            ]);

            setWeatherData({
                current: currentWeather,
                forecast: forecast
            });

            setUiState(prev => ({
                ...prev,
                loading: false,
                error: null
            }));

        } catch (error) {
            setUiState(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));

            // Reset weather data if there's an error
            setWeatherData({
                current: null,
                forecast: null
            });
        }
    };

    // Error Message Component
    const ErrorMessage = ({ message }) => (
        <div className="w-full max-w-3xl mx-auto mt-4 px-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex items-center">
                    <svg 
                        className="w-5 h-5 text-red-500 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <p className="text-red-700">{message}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pb-8">
            <Form newLocation={handleLocationSearch} />
            
            {uiState.error && <ErrorMessage message={uiState.error} />}
            
            <Card
                showData={!uiState.error && weatherData.current !== null}
                loadingData={uiState.loading}
                weather={weatherData.current || {}}
                forecast={weatherData.forecast || {}}
            />
        </div>
    );
};

export default WeatherPanel;
