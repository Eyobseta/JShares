import { View, Text, Button, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { usePairedDevices } from '../../hooks/usePairedDevices';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const { addDevice } = usePairedDevices();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text>Camera permission required</Text>
        <Button title="Grant" onPress={requestPermission} />
      </View>
    );
  }

  const handleScan = async (data) => {
    try {
      const prefix = "JShare:";
      if (!data.startsWith(prefix)) throw new Error('Invalid QR code');
      const parts = data.slice(prefix.length).split(':');
      const [deviceName, ip, portStr, secretKey] = parts;
      const port = parseInt(portStr) || 8080;

      await addDevice({
        id: deviceName,
        ip,
        port,
        secretKey,
      });
      Alert.alert('Paired', `Added ${deviceName}`);
      router.back();
    } catch (e) {
      Alert.alert('Error', 'Invalid QR code format');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={({ data }) => handleScan(data)}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />
    </View>
  );
}