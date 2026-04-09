import axios from 'axios';
import { xorEncrypt } from './encryption';

export async function sendTextToDevice(device, text) {
  const encrypted = xorEncrypt(text, device.secretKey);
  const url = `http://${device.ip}:${device.port}/receive`;
  await axios.post(url, { type: 'text', content: encrypted });
}

export async function sendFileToDevice(device, uri, name) {
  const formData = new FormData();
  formData.append('file', { uri, name, type: 'application/octet-stream' });
  const url = `http://${device.ip}:${device.port}/upload`;
  await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}