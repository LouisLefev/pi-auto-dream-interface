
import { AndroidDevice } from './deviceDetection';

export interface OpenAutoStatus {
  isRunning: boolean;
  connectedDevice?: AndroidDevice;
  error?: string;
}

export class OpenAutoManager {
  private status: OpenAutoStatus = { isRunning: false };
  private listeners: ((status: OpenAutoStatus) => void)[] = [];

  async startOpenAuto(device: AndroidDevice): Promise<boolean> {
    try {
      console.log(`Starting OpenAuto for device: ${device.name}`);
      
      // En production, ceci lancerait la commande OpenAuto
      // exec('openauto', callback);
      
      // Simulation du démarrage
      this.updateStatus({
        isRunning: true,
        connectedDevice: device
      });

      // Simuler le lancement d'OpenAuto en arrière-plan
      setTimeout(() => {
        console.log('OpenAuto started successfully');
        this.launchOpenAutoWindow();
      }, 2000);

      return true;
    } catch (error) {
      console.error('Failed to start OpenAuto:', error);
      this.updateStatus({
        isRunning: false,
        error: 'Failed to start OpenAuto'
      });
      return false;
    }
  }

  async stopOpenAuto(): Promise<boolean> {
    try {
      console.log('Stopping OpenAuto...');
      
      // En production, ceci arrêterait le processus OpenAuto
      // exec('pkill openauto', callback);
      
      this.updateStatus({ isRunning: false });
      this.closeOpenAutoWindow();
      
      return true;
    } catch (error) {
      console.error('Failed to stop OpenAuto:', error);
      return false;
    }
  }

  private launchOpenAutoWindow() {
    // En production, OpenAuto s'ouvrirait en plein écran
    // Pour le développement, on peut simuler avec une nouvelle fenêtre
    const openAutoWindow = window.open(
      'about:blank',
      'openauto',
      'fullscreen=yes,menubar=no,toolbar=no,location=no,status=no'
    );
    
    if (openAutoWindow) {
      openAutoWindow.document.write(`
        <html>
          <head>
            <title>OpenAuto - Android Auto</title>
            <style>
              body { 
                margin: 0; 
                background: #000; 
                color: white; 
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              .container {
                text-align: center;
                padding: 20px;
              }
              .logo {
                font-size: 48px;
                margin-bottom: 20px;
              }
              .status {
                font-size: 24px;
                margin-bottom: 20px;
              }
              .apps {
                display: flex;
                gap: 20px;
                justify-content: center;
              }
              .app {
                width: 80px;
                height: 80px;
                background: #333;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                cursor: pointer;
              }
              .app.maps { background: #4285F4; }
              .app.music { background: #FF6B35; }
              .app.phone { background: #34A853; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">🚗 OpenAuto</div>
              <div class="status">Android Auto Connected</div>
              <div class="apps">
                <div class="app maps">Maps</div>
                <div class="app music">Music</div>
                <div class="app phone">Phone</div>
              </div>
            </div>
            <script>
              // Fermer OpenAuto quand on clique sur Escape
              document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                  window.close();
                }
              });
            </script>
          </body>
        </html>
      `);
    }
  }

  private closeOpenAutoWindow() {
    // En production, ceci fermerait la fenêtre OpenAuto
    console.log('Closing OpenAuto window');
  }

  getStatus(): OpenAutoStatus {
    return this.status;
  }

  subscribe(listener: (status: OpenAutoStatus) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private updateStatus(newStatus: Partial<OpenAutoStatus>) {
    this.status = { ...this.status, ...newStatus };
    this.listeners.forEach(listener => listener(this.status));
  }
}

export const openAutoManager = new OpenAutoManager();
