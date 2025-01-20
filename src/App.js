// App.js
import React from 'react';
import NavBar from './components/NavBar';
import WeatherPanel from './components/WeatherPanel';
import './assets/css/App.css';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Fondo con gradiente y patrón */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-50 to-blue-50 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <NavBar />
        
        <main className="container mx-auto px-4 py-6">
          <WeatherPanel />
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full py-4 text-center text-gray-600 text-sm">
          <p>Desarrollado con ❤️ usando React y TailwindCSS</p>
        </footer>
      </div>

      {/* Decoración de fondo */}
      <div className="fixed top-0 left-0 w-1/3 h-1/3 bg-violet-100 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-pink-100 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  );
}

// Estilos adicionales para las animaciones
const style = document.createElement('style');
style.textContent = `
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);

export default App;
