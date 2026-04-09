import { useState, useEffect } from 'react';
import { loadPairedDevices, savePairedDevices } from '../services/storage';

export function usePairedDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPairedDevices().then(data => {
      setDevices(data);
      setLoading(false);
    });
  }, []);

  const addDevice = async (device) => {
    const updated = [...devices.filter(d => d.id !== device.id), device];
    await savePairedDevices(updated);
    setDevices(updated);
  };

  const removeDevice = async (deviceId) => {
    const updated = devices.filter(d => d.id !== deviceId);
    await savePairedDevices(updated);
    setDevices(updated);
  };

  return { devices, loading, addDevice, removeDevice };
}