
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import AndroidAuto from '@/components/AndroidAuto';
import Settings from '@/components/Settings';
import Home from '@/components/Home';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'android-auto':
        return <AndroidAuto />;
      case 'settings':
        return <Settings />;
      case 'home':
      default:
        return <Home onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-automotive-dark flex w-full">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        <div className="animate-slide-in">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
};

export default Index;
