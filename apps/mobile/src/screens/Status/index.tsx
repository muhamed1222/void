import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theming/hooks';

export const StatusScreen = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Статус</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Здесь будет отображаться ваш текущий статус
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default StatusScreen;