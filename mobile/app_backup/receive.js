import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { loadHistory } from '../services/storage';
import RecentItem from '../components/RecentItem';
import { colors } from '../constants/colors';

export default function Receive() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadHistory().then(setHistory);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, color: colors.text, marginBottom: 16 }}>Recent Activity</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecentItem item={item} />}
        ListEmptyComponent={<Text style={{ color: colors.textSecondary }}>No items yet.</Text>}
      />
    </View>
  );
}