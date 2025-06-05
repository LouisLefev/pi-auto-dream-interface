
import React from 'react';
import { Gauge, Smartphone, Settings, Home } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Gauge },
    { id: 'android-auto', label: 'Android Auto', icon: Smartphone },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'home', label: 'Accueil', icon: Home }
  ];

  return (
    <div className="bg-automotive-gray-900 border-r border-automotive-gray-700 w-64 h-full flex flex-col">
      <div className="p-6 border-b border-automotive-gray-700">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg flex items-center justify-center">
            <Gauge className="w-5 h-5 text-white" />
          </div>
          CarInterface
        </h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-automotive-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-automotive-gray-700">
        <div className="text-xs text-gray-400 text-center">
          Raspberry Pi Interface v1.0
        </div>
      </div>
    </div>
  );
};

export default Navigation;
