import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { usePairedDevices } from '../../hooks/usePairedDevices';
import { colors } from '../../constants/colors';

export default function ManualPairing() {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('8080');
  const [secret, setSecret] = useState('');
  const { addDevice } = usePairedDevices();
  const router = useRouter();

  const handlePair = async () => {
    if (!name || !ip) {
      Alert.alert('Error', 'Name and IP are required');
      return;
    }
    await addDevice({
      id: name,
      ip,
      port: parseInt(port) || 8080,
      secretKey: secret || 'defaultkey',
    });
    Alert.alert('Success', `Paired with ${name}`);
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, color: colors.text, marginBottom: 20 }}>Manual Pairing</Text>
      <TextInput placeholder="Device Name" placeholderTextColor={colors.textSecondary} style={{ backgroundColor: colors.surface, color: colors.text, padding: 12, borderRadius: 8, marginBottom: 12 }} value={name} onChangeText={setName} />
      <TextInput placeholder="IP Address (e.g., 192.168.1.10)" placeholderTextColor={colors.textSecondary} style={{ backgroundColor: colors.surface, color: colors.text, padding: 12, borderRadius: 8, marginBottom: 12 }} value={ip} onChangeText={setIp} />
      <TextInput placeholder="Port (default 8080)" placeholderTextColor={colors.textSecondary} style={{ backgroundColor: colors.surface, color: colors.text, padding: 12, borderRadius: 8, marginBottom: 12 }} value={port} onChangeText={setPort} keyboardType="numeric" />
      <TextInput placeholder="Secret Key (optional)" placeholderTextColor={colors.textSecondary} style={{ backgroundColor: colors.surface, color: colors.text, padding: 12, borderRadius: 8, marginBottom: 20 }} value={secret} onChangeText={setSecret} />
      <TouchableOpacity onPress={handlePair} style={{ backgroundColor: colors.primary, padding: 14, borderRadius: 30, alignItems: 'center' }}>
        <Text style={{ color: colors.text, fontWeight: 'bold' }}>Pair Device</Text>
      </TouchableOpacity>
    </View>
  );
}