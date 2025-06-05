
import React, { useState } from 'react';
import { Settings as SettingsIcon, Cpu, Bluetooth, Wifi, Volume2 } from 'lucide-react';

const Settings: React.FC = () => {
  const [gpioSettings, setGpioSettings] = useState({
    speedPin: 18,
    tempPin: 24,
    updateInterval: 1000
  });
  
  const [systemSettings, setSystemSettings] = useState({
    brightness: 80,
    volume: 60,
    bluetoothEnabled: true,
    wifiEnabled: true
  });

  const handleGpioChange = (setting: string, value: number) => {
    setGpioSettings(prev => ({ ...prev, [setting]: value }));
    console.log(`GPIO ${setting} mis à jour: ${value}`);
  };

  const handleSystemChange = (setting: string, value: number | boolean) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
    console.log(`Paramètre système ${setting} mis à jour: ${value}`);
  };

  return (
    <div className="h-full bg-gradient-to-br from-automotive-gray-900 to-automotive-dark p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Paramètres</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Paramètres GPIO */}
        <div className="bg-automotive-gray-800 rounded-2xl p-6 border border-automotive-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">Configuration GPIO</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pin GPIO Vitesse
              </label>
              <input
                type="number"
                value={gpioSettings.speedPin}
                onChange={(e) => handleGpioChange('speedPin', parseInt(e.target.value))}
                className="w-full bg-automotive-gray-700 border border-automotive-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pin GPIO Température
              </label>
              <input
                type="number"
                value={gpioSettings.tempPin}
                onChange={(e) => handleGpioChange('tempPin', parseInt(e.target.value))}
                className="w-full bg-automotive-gray-700 border border-automotive-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Intervalle de mise à jour (ms)
              </label>
              <input
                type="number"
                value={gpioSettings.updateInterval}
                onChange={(e) => handleGpioChange('updateInterval', parseInt(e.target.value))}
                className="w-full bg-automotive-gray-700 border border-automotive-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Paramètres système */}
        <div className="bg-automotive-gray-800 rounded-2xl p-6 border border-automotive-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">Système</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Luminosité: {systemSettings.brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={systemSettings.brightness}
                onChange={(e) => handleSystemChange('brightness', parseInt(e.target.value))}
                className="w-full h-2 bg-automotive-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Volume: {systemSettings.volume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={systemSettings.volume}
                onChange={(e) => handleSystemChange('volume', parseInt(e.target.value))}
                className="w-full h-2 bg-automotive-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bluetooth className="w-5 h-5 text-blue-400" />
                <span className="text-white">Bluetooth</span>
              </div>
              <button
                onClick={() => handleSystemChange('bluetoothEnabled', !systemSettings.bluetoothEnabled)}
                className={`w-12 h-6 rounded-full ${
                  systemSettings.bluetoothEnabled ? 'bg-blue-500' : 'bg-gray-600'
                } relative transition-colors`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  systemSettings.bluetoothEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-green-400" />
                <span className="text-white">WiFi</span>
              </div>
              <button
                onClick={() => handleSystemChange('wifiEnabled', !systemSettings.wifiEnabled)}
                className={`w-12 h-6 rounded-full ${
                  systemSettings.wifiEnabled ? 'bg-green-500' : 'bg-gray-600'
                } relative transition-colors`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  systemSettings.wifiEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Informations système */}
        <div className="lg:col-span-2 bg-automotive-gray-800 rounded-2xl p-6 border border-automotive-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Informations système</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-automotive-gray-700 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-blue-400 mb-1">Raspberry Pi 4</div>
              <div className="text-sm text-gray-400">Modèle</div>
            </div>
            <div className="bg-automotive-gray-700 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-green-400 mb-1">4GB</div>
              <div className="text-sm text-gray-400">RAM</div>
            </div>
            <div className="bg-automotive-gray-700 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-orange-400 mb-1">42°C</div>
              <div className="text-sm text-gray-400">Temp CPU</div>
            </div>
            <div className="bg-automotive-gray-700 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-purple-400 mb-1">v1.0</div>
              <div className="text-sm text-gray-400">Version</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
