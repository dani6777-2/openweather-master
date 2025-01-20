import React from "react";

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="relative">
                {/* Círculo exterior */}
                <div className="w-16 h-16 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin" />
                
                {/* Icono del clima en el centro */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg 
                        className="w-6 h-6 text-violet-600 animate-pulse" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                    </svg>
                </div>
            </div>
            <p className="text-gray-500 animate-pulse">Cargando datos del clima...</p>
        </div>
    );
}

export default Spinner;
