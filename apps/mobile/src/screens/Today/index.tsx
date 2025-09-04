import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodayScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сегодня</Text>
      <Text>Инструкция (контекстная) → 3–5 задач (включая книгу) → мини‑отчёт → сниппет Консоли</Text>
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

export default TodayScreen;