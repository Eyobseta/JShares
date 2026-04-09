import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../constants/colors';

export default function GradientButton({ title, onPress, disabled = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.textSecondary : colors.primary,
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <Text style={{ color: colors.text, fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
}