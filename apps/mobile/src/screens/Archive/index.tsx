import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theming/hooks';

export const ArchiveScreen = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Архив</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Здесь будут отображаться архивные записи
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

export default ArchiveScreen;