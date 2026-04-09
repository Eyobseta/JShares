import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const PAIRED_DEVICES_KEY = '@jshare_paired_devices';
const HISTORY_KEY = '@jshare_history';

export async function savePairedDevices(devices) {
  await AsyncStorage.setItem(PAIRED_DEVICES_KEY, JSON.stringify(devices));
}

export async function loadPairedDevices() {
  const raw = await AsyncStorage.getItem(PAIRED_DEVICES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addToHistory(item) {
  const history = await loadHistory();
  const newHistory = [item, ...history].slice(0, 20);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

export async function loadHistory() {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveSecretForDevice(deviceId, secret) {
  await SecureStore.setItemAsync(`secret_${deviceId}`, secret);
}

export async function getSecretForDevice(deviceId) {
  return await SecureStore.getItemAsync(`secret_${deviceId}`);
}