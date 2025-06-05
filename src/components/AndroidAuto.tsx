
import React, { useState } from 'react';
import { Smartphone, Bluetooth, Wifi, Cable, CheckCircle, AlertCircle } from 'lucide-react';

const AndroidAuto: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);

  const handleConnect = (method: string) => {
    setConnectionStatus('connecting');
    console.log(`Tentative de connexion via ${method}`);
    
    // Simulation de connexion
    setTimeout(() => {
      setConnectionStatus('connected');
      setConnectedDevice('Samsung Galaxy S21');
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setConnectedDevice(null);
    console.log('Déconnexion Android Auto');
  };

  return (
    <div className="h-full bg-gradient-to-br from-automotive-gray-900 to-automotive-dark p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Android Auto</h2>
      
      {connectionStatus === 'disconnected' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-automotive-gray-800 rounded-2xl p-8 border border-automotive-gray-700 mb-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Connecter votre téléphone</h3>
              <p className="text-gray-400">Choisissez votre méthode de connexion préférée</p>
            </div>
            
            <div className="grid gap-4">
              <button
                onClick={() => handleConnect('USB')}
                className="flex items-center gap-4 p-6 bg-automotive-gray-700 rounded-xl hover:bg-automotive-gray-600 transition-colors border border-automotive-gray-600"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Cable className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Connexion USB</div>
                  <div className="text-sm text-gray-400">Connexion rapide et stable</div>
                </div>
              </button>
              
              <button
                onClick={() => handleConnect('Bluetooth')}
                className="flex items-center gap-4 p-6 bg-automotive-gray-700 rounded-xl hover:bg-automotive-gray-600 transition-colors border border-automotive-gray-600"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bluetooth className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Bluetooth</div>
                  <div className="text-sm text-gray-400">Connexion sans fil</div>
                </div>
              </button>
              
              <button
                onClick={() => handleConnect('WiFi')}
                className="flex items-center gap-4 p-6 bg-automotive-gray-700 rounded-xl hover:bg-automotive-gray-600 transition-colors border border-automotive-gray-600"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">WiFi Direct</div>
                  <div className="text-sm text-gray-400">Connexion WiFi haute vitesse</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {connectionStatus === 'connecting' && (
        <div className="max-w-md mx-auto text-center">
          <div className="bg-automotive-gray-800 rounded-2xl p-8 border border-automotive-gray-700">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Connexion en cours...</h3>
            <p className="text-gray-400 mb-6">Veuillez patienter pendant la connexion à votre appareil</p>
            <div className="w-full bg-automotive-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}
      
      {connectionStatus === 'connected' && connectedDevice && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-automotive-gray-800 rounded-2xl p-8 border border-automotive-gray-700 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Connecté</h3>
                <p className="text-gray-400">{connectedDevice}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-automotive-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-500 mb-2">100%</div>
                <div className="text-sm text-gray-400">Qualité signal</div>
              </div>
              <div className="bg-automotive-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-500 mb-2">5.0</div>
                <div className="text-sm text-gray-400">Version AA</div>
              </div>
            </div>
            
            <button
              onClick={handleDisconnect}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Déconnecter
            </button>
          </div>
          
          {/* Interface Android Auto simulée */}
          <div className="bg-black rounded-2xl p-8 border border-automotive-gray-700">
            <div className="text-center text-white">
              <h4 className="text-lg font-semibold mb-4">Interface Android Auto</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-600 rounded-lg p-4 text-sm">Maps</div>
                <div className="bg-blue-600 rounded-lg p-4 text-sm">Music</div>
                <div className="bg-purple-600 rounded-lg p-4 text-sm">Phone</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AndroidAuto;
