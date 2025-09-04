import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConsoleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Консоль</Text>
      <Text>протокол/команды; спец‑вставки (план‑2ч)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ConsoleScreen;