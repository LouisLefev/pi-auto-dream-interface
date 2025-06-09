
import { useState, useEffect } from 'react';
import { AndroidDevice, deviceDetectionService } from '../services/deviceDetection';
import { OpenAutoStatus, openAutoManager } from '../services/openAutoManager';

export const useAndroidDevices = () => {
  const [devices, setDevices] = useState<AndroidDevice[]>([]);
  const [openAutoStatus, setOpenAutoStatus] = useState<OpenAutoStatus>({ isRunning: false });

  useEffect(() => {
    // S'abonner aux changements de devices
    const unsubscribeDevices = deviceDetectionService.subscribe(setDevices);
    
    // S'abonner aux changements de statut OpenAuto
    const unsubscribeOpenAuto = openAutoManager.subscribe(setOpenAutoStatus);

    // Initialiser avec les devices actuels
    setDevices(deviceDetectionService.getDevices());
    setOpenAutoStatus(openAutoManager.getStatus());

    return () => {
      unsubscribeDevices();
      unsubscribeOpenAuto();
    };
  }, []);

  const connectDevice = async (device: AndroidDevice) => {
    return await openAutoManager.startOpenAuto(device);
  };

  const disconnectDevice = async () => {
    return await openAutoManager.stopOpenAuto();
  };

  const removeDevice = (deviceId: string) => {
    deviceDetectionService.removeDevice(deviceId);
  };

  return {
    devices,
    openAutoStatus,
    connectDevice,
    disconnectDevice,
    removeDevice
  };
};
