
import React from 'react';
import { Smartphone, Bluetooth, Wifi, Cable, CheckCircle, AlertCircle, Battery, X } from 'lucide-react';
import { useAndroidDevices } from '../hooks/useAndroidDevices';

const AndroidAuto: React.FC = () => {
  const { devices, openAutoStatus, connectDevice, disconnectDevice, removeDevice } = useAndroidDevices();

  const handleConnect = async (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      const success = await connectDevice(device);
      if (success) {
        console.log(`Connected to ${device.name} via OpenAuto`);
      }
    }
  };

  const handleDisconnect = async () => {
    await disconnectDevice();
    console.log('Disconnected from OpenAuto');
  };

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'usb': return Cable;
      case 'bluetooth': return Bluetooth;
      case 'wifi': return Wifi;
      default: return Smartphone;
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'usb': return 'from-blue-500 to-blue-400';
      case 'bluetooth': return 'from-purple-500 to-purple-400';
      case 'wifi': return 'from-green-500 to-green-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-automotive-gray-900 to-automotive-dark p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Android Auto avec OpenAuto</h2>
      
      {/* Statut OpenAuto */}
      {openAutoStatus.isRunning && openAutoStatus.connectedDevice && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">OpenAuto Actif</h3>
                  <p className="text-green-400">{openAutoStatus.connectedDevice.name}</p>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des appareils détectés */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-automotive-gray-800 rounded-2xl p-8 border border-automotive-gray-700 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Appareils détectés</h3>
              <p className="text-gray-400">
                {devices.length} appareil{devices.length !== 1 ? 's' : ''} trouvé{devices.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {devices.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-automotive-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Aucun appareil détecté</h4>
              <p className="text-gray-400 mb-4">
                Connectez votre téléphone Android via USB, Bluetooth ou WiFi
              </p>
              <div className="text-sm text-gray-500">
                • Activez le mode développeur sur votre téléphone<br/>
                • Autorisez le débogage USB<br/>
                • Vérifiez que Android Auto est installé
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {devices.map((device) => {
                const Icon = getConnectionIcon(device.connectionType);
                const colorClass = getConnectionColor(device.connectionType);
                
                return (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 bg-automotive-gray-700 rounded-xl border border-automotive-gray-600"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-full flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{device.name}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          <span className="capitalize">{device.connectionType}</span>
                          {device.batteryLevel && (
                            <>
                              <span>•</span>
                              <Battery className="w-4 h-4" />
                              <span>{device.batteryLevel}%</span>
                            </>
                          )}
                          {device.isAndroidAuto && (
                            <>
                              <span>•</span>
                              <span className="text-green-400">Android Auto</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {device.isAndroidAuto && !openAutoStatus.isRunning && (
                        <button
                          onClick={() => handleConnect(device.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Connecter
                        </button>
                      )}
                      <button
                        onClick={() => removeDevice(device.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Erreurs OpenAuto */}
        {openAutoStatus.error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <h4 className="font-medium text-white">Erreur OpenAuto</h4>
                <p className="text-red-400 text-sm">{openAutoStatus.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Informations sur OpenAuto */}
        <div className="bg-automotive-gray-800 rounded-xl p-6 border border-automotive-gray-700">
          <h4 className="font-semibold text-white mb-3">À propos d'OpenAuto</h4>
          <div className="text-sm text-gray-400 space-y-2">
            <p>• Implémentation open-source d'Android Auto</p>
            <p>• Compatible avec la plupart des téléphones Android</p>
            <p>• Supporte la navigation, musique, et appels</p>
            <p>• Optimisé pour Raspberry Pi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidAuto;
