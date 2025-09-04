import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiagnosticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Диагностика</Text>
      <Text>метрики + дельты; бар «7 дней минимум (✓/✗)»; лог; вывод наставника</Text>
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

export default DiagnosticsScreen;