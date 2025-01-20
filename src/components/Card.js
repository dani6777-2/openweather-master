import React from "react";
import Spinner from "./Spinner";

// Componente para la imagen del clima
const WeatherImage = ({ weatherMain }) => {
    const getWeatherImage = (condition) => {
        const conditions = {
            cloud: "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg",
            rain: "https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg",
            snow: "https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg",
            clear: "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg",
            default: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg"
        };

        const type = Object.keys(conditions).find(key => condition.toLowerCase().includes(key));
        return conditions[type] || conditions.default;
    };

    return (
        <img
            src={getWeatherImage(weatherMain)}
            className="w-full h-48 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            alt={weatherMain}
        />
    );
};

// Componente para los detalles del clima
const WeatherDetails = ({ details }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {details.map((item, index) => (
            <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <h5 className="text-xs sm:text-sm font-medium text-gray-600">{item.label}</h5>
                <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">{item.value}</p>
            </div>
        ))}
    </div>
);

// Componente para el pronóstico
const ForecastItem = ({ forecast }) => (
    <div className="bg-violet-50 p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
        <p className="text-xs sm:text-sm font-semibold text-violet-800 mb-1">{forecast.time}</p>
        <div className="flex items-center space-x-1 sm:space-x-2">
            <img src={forecast.icon} alt="Weather icon" className="w-8 h-8 sm:w-10 sm:h-10" />
            <div>
                <p className="text-base sm:text-lg font-bold text-gray-800">{forecast.temp}°C</p>
                <p className="text-xs sm:text-sm text-gray-600 capitalize">{forecast.desc}</p>
            </div>
        </div>
    </div>
);

const Card = ({ loadingData, showData, weather, forecast }) => {
    if (loadingData) return <Spinner />;
    if (!showData) return <div className="flex items-center justify-center h-64"><h2 className="text-xl sm:text-2xl text-gray-600 font-medium">Sin datos disponibles</h2></div>;

    const kelvinToCelsius = k => (k - 273.15).toFixed(1);
    const formatForecastDate = date => {
        const d = new Date(date);
        return `${d.getHours()}:00 hrs`;
    };
    const baseIconUrl = 'http://openweathermap.org/img/w/';

    const weatherDetails = [
        { label: "Temperatura máxima", value: `${kelvinToCelsius(weather.main.temp_max)}°C` },
        { label: "Temperatura mínima", value: `${kelvinToCelsius(weather.main.temp_min)}°C` },
        { label: "Sensación térmica", value: `${kelvinToCelsius(weather.main.feels_like)}°C` },
        { label: "Humedad", value: `${weather.main.humidity}%` },
        { label: "Velocidad del viento", value: `${weather.wind.speed} m/s` }
    ];

    const forecastData = forecast.list.slice(0, 6).map(item => ({
        time: formatForecastDate(item.dt_txt),
        icon: `${baseIconUrl}${item.weather[0].icon}.png`,
        temp: kelvinToCelsius(item.main.temp),
        desc: item.weather[0].description
    }));

    return (
        <div className="mt-20 sm:mt-24 mb-8">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        <div className="relative overflow-hidden group h-64 lg:h-auto">
                            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/90 to-violet-800/90 z-10" />
                            <WeatherImage weatherMain={weather.weather[0].main} />
                            <div className="absolute inset-0 z-20 p-4 sm:p-6 flex flex-col justify-center items-center text-white">
                                <h2 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{weather.name}</h2>
                                <p className="text-base sm:text-lg mb-2 sm:mb-4">{new Date().toLocaleDateString()}</p>
                                <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                                    <span className="text-4xl sm:text-6xl font-bold">{kelvinToCelsius(weather.main.temp)}°C</span>
                                    <img src={`${baseIconUrl}${weather.weather[0].icon}.png`} alt="Weather icon" className="w-12 h-12 sm:w-16 sm:h-16" />
                                </div>
                                <p className="text-lg sm:text-xl mt-1 sm:mt-2 capitalize">{weather.weather[0].description}</p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-inner mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Detalles del Clima</h3>
                                <WeatherDetails details={weatherDetails} />
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Pronóstico 24h</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                    {forecastData.map((f, i) => <ForecastItem key={i} forecast={f} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;