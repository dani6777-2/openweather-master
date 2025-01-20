import React, { useState } from 'react';

const Form = ({ newLocation }) => {
    const [city, setCity] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (city.trim() === '') return;
        newLocation(city);
        setCity('');
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-20">
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        value={city}
                        className="
                            w-full px-4 h-12
                            bg-white shadow-sm
                            border border-gray-200
                            rounded-lg text-gray-800
                            placeholder-gray-400
                            transition-all duration-200
                            focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500
                            hover:border-gray-300
                        "
                        placeholder="Ingresa el nombre de una ciudad..."
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!city.trim()}
                    className={`
                        h-12 px-6
                        rounded-lg
                        flex items-center justify-center gap-2
                        transition-all duration-200
                        ${city.trim() 
                            ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
                        sm:w-auto w-full
                    `}
                >
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                    <span className="sm:block hidden">Buscar</span>
                </button>
            </form>
        </div>
    );
};

export default Form;
