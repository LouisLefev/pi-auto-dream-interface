
import React, { useState, useEffect } from 'react';
import { Gauge, Thermometer } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [speed, setSpeed] = useState(0);
  const [temperature, setTemperature] = useState(85);
  const [isEngineOn, setIsEngineOn] = useState(true);

  // Simulation des données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      if (isEngineOn) {
        setSpeed(prev => Math.max(0, prev + Math.random() * 10 - 5));
        setTemperature(prev => Math.max(60, Math.min(120, prev + Math.random() * 4 - 2)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isEngineOn]);

  const getSpeedColor = (speed: number) => {
    if (speed > 120) return 'text-red-500';
    if (speed > 80) return 'text-orange-500';
    return 'text-green-500';
  };

  const getTempColor = (temp: number) => {
    if (temp > 100) return 'text-red-500';
    if (temp > 90) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="h-full bg-gradient-to-br from-automotive-gray-900 to-automotive-dark p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Indicateur de vitesse */}
        <div className="bg-automotive-gray-800 rounded-2xl p-8 border border-automotive-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Vitesse</h3>
            </div>
            
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${getSpeedColor(speed)}`}>
                {Math.round(speed)}
              </div>
              <div className="text-gray-400 text-lg">km/h</div>
              
              {/* Barre de progression */}
              <div className="mt-6 w-full bg-automotive-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    speed > 120 ? 'bg-red-500' : speed > 80 ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(speed / 160 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de température */}
        <div className="bg-automotive-gray-800 rounded-2xl p-8 border border-automotive-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Température moteur</h3>
            </div>
            
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${getTempColor(temperature)}`}>
                {Math.round(temperature)}°
              </div>
              <div className="text-gray-400 text-lg">Celsius</div>
              
              {/* Barre de progression */}
              <div className="mt-6 w-full bg-automotive-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    temperature > 100 ? 'bg-red-500' : temperature > 90 ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((temperature - 60) / 60 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status du système */}
        <div className="lg:col-span-2 bg-automotive-gray-800 rounded-2xl p-6 border border-automotive-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">État du système</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${isEngineOn ? 'bg-green-500 animate-pulse-glow' : 'bg-gray-500'}`}></div>
              <div className="text-sm text-gray-400">Moteur</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mx-auto mb-2 animate-pulse-glow"></div>
              <div className="text-sm text-gray-400">GPIO</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mx-auto mb-2 animate-pulse-glow"></div>
              <div className="text-sm text-gray-400">Bluetooth</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mx-auto mb-2"></div>
              <div className="text-sm text-gray-400">WiFi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
