
export interface AndroidDevice {
  id: string;
  name: string;
  connectionType: 'usb' | 'bluetooth' | 'wifi';
  isAndroidAuto: boolean;
  batteryLevel?: number;
}

export class DeviceDetectionService {
  private devices: Map<string, AndroidDevice> = new Map();
  private listeners: ((devices: AndroidDevice[]) => void)[] = [];

  constructor() {
    this.startDetection();
  }

  private async startDetection() {
    // Simulation de détection USB via lsusb
    setInterval(() => {
      this.detectUSBDevices();
    }, 2000);

    // Simulation de détection Bluetooth
    setInterval(() => {
      this.detectBluetoothDevices();
    }, 3000);
  }

  private async detectUSBDevices() {
    try {
      // En production, ceci ferait appel à lsusb ou à l'API OpenAuto
      console.log('Scanning for USB devices...');
      
      // Simulation pour le développement
      if (Math.random() > 0.7) {
        const device: AndroidDevice = {
          id: 'usb-samsung-001',
          name: 'Samsung Galaxy S21',
          connectionType: 'usb',
          isAndroidAuto: true,
          batteryLevel: Math.floor(Math.random() * 100)
        };
        this.addDevice(device);
      }
    } catch (error) {
      console.error('Error detecting USB devices:', error);
    }
  }

  private async detectBluetoothDevices() {
    try {
      // En production, ceci ferait appel à bluetoothctl ou à l'API système
      console.log('Scanning for Bluetooth devices...');
      
      // Simulation pour le développement
      if (Math.random() > 0.8) {
        const device: AndroidDevice = {
          id: 'bt-pixel-001',
          name: 'Google Pixel 6',
          connectionType: 'bluetooth',
          isAndroidAuto: true,
          batteryLevel: Math.floor(Math.random() * 100)
        };
        this.addDevice(device);
      }
    } catch (error) {
      console.error('Error detecting Bluetooth devices:', error);
    }
  }

  private addDevice(device: AndroidDevice) {
    this.devices.set(device.id, device);
    this.notifyListeners();
    console.log(`Device connected: ${device.name} via ${device.connectionType}`);
  }

  public removeDevice(deviceId: string) {
    if (this.devices.delete(deviceId)) {
      this.notifyListeners();
      console.log(`Device disconnected: ${deviceId}`);
    }
  }

  public getDevices(): AndroidDevice[] {
    return Array.from(this.devices.values());
  }

  public subscribe(listener: (devices: AndroidDevice[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    const devices = this.getDevices();
    this.listeners.forEach(listener => listener(devices));
  }
}

export const deviceDetectionService = new DeviceDetectionService();
