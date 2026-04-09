import { View, Text, Linking, Alert, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

export default function RecentItem({ item }) {
  const handlePress = () => {
    if (item.type === 'link') {
      Linking.openURL(item.content).catch(() => Alert.alert('Error', 'Cannot open link'));
    } else {
      Alert.alert('Content', item.content);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginBottom: 12 }}>
      <View style={{ backgroundColor: colors.surface, padding: 12, borderRadius: 12 }}>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
          {item.direction === 'sent' ? '→ Sent' : '← Received'} • {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
        <Text style={{ color: colors.text }}>
          {item.type === 'file' ? '📎 ' : ''}
          {item.content.length > 80 ? item.content.slice(0, 80) + '…' : item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}