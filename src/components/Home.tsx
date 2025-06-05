
import React from 'react';
import { Gauge, Smartphone, Settings, Activity } from 'lucide-react';

interface HomeProps {
  onViewChange: (view: string) => void;
}

const Home: React.FC<HomeProps> = ({ onViewChange }) => {
  const quickActions = [
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      description: 'Vitesse et température moteur en temps réel',
      icon: Gauge,
      color: 'from-blue-500 to-blue-400'
    },
    {
      id: 'android-auto',
      title: 'Android Auto',
      description: 'Connecter votre smartphone',
      icon: Smartphone,
      color: 'from-green-500 to-green-400'
    },
    {
      id: 'settings',
      title: 'Paramètres',
      description: 'Configuration GPIO et système',
      icon: Settings,
      color: 'from-purple-500 to-purple-400'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-automotive-gray-900 to-automotive-dark p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Interface Automobile
          </h1>
          <p className="text-xl text-gray-400">
            Système embarqué pour Raspberry Pi
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-automotive-gray-800 rounded-xl p-6 border border-automotive-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-white">Système</h3>
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">Actif</div>
            <div className="text-sm text-gray-400">Tous systèmes opérationnels</div>
          </div>

          <div className="bg-automotive-gray-800 rounded-xl p-6 border border-automotive-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Gauge className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-white">Capteurs</h3>
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-1">2/2</div>
            <div className="text-sm text-gray-400">GPIO connectés</div>
          </div>

          <div className="bg-automotive-gray-800 rounded-xl p-6 border border-automotive-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-white">Connexions</h3>
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1">Prêt</div>
            <div className="text-sm text-gray-400">Android Auto disponible</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <button
                key={action.id}
                onClick={() => onViewChange(action.id)}
                className="bg-automotive-gray-800 rounded-2xl p-8 border border-automotive-gray-700 hover:border-automotive-gray-600 transition-all duration-300 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-automotive-gray-800 rounded-full px-6 py-3 border border-automotive-gray-700">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Raspberry Pi Interface v1.0 - Opérationnel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
