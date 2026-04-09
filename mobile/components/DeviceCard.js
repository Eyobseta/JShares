import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

export default function DeviceCard({ device, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        backgroundColor: selected ? colors.primary : colors.surface,
        padding: 12,
        borderRadius: 12,
        marginRight: 12,
        minWidth: 120,
      }}
    >
      <Text style={{ color: colors.text, fontWeight: 'bold' }}>{device.id}</Text>
      <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{device.ip}</Text>
    </TouchableOpacity>
  );
}