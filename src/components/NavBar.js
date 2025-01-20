import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 fixed w-full top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <svg 
                        className="w-8 h-8 text-violet-600" 
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
                    <h1 className="text-xl font-semibold text-gray-800">
                        Weather<span className="text-violet-600">App</span>
                    </h1>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
