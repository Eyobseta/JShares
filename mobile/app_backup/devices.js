import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { usePairedDevices } from '../hooks/usePairedDevices';
import { colors } from '../constants/colors';

export default function Devices() {
  const { devices, removeDevice } = usePairedDevices();
  const router = useRouter();

  const confirmRemove = (deviceId) => {
    Alert.alert('Remove Device', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeDevice(deviceId) },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, color: colors.text, marginBottom: 16 }}>Paired Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 12, borderRadius: 12, marginBottom: 8 }}>
            <View>
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>{item.id}</Text>
              <Text style={{ color: colors.textSecondary }}>{item.ip}:{item.port}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmRemove(item.id)}>
              <Text style={{ color: colors.error }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: colors.textSecondary }}>No paired devices. Tap + to add.</Text>}
      />
      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/pairing/qr')} style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 30, flex: 1, marginRight: 8, alignItems: 'center' }}>
          <Text style={{ color: colors.text }}>Scan QR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/pairing/manual')} style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 30, flex: 1, marginLeft: 8, alignItems: 'center' }}>
          <Text style={{ color: colors.text }}>Manual IP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}