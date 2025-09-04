import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theming/hooks';
import { scenariosService } from '@/services/scenarios';
import { Scenario } from '@/domain/types';

export const ScenariosScreen = () => {
  const { colors } = useTheme();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const allScenarios = await scenariosService.getAllScenarios();
      setScenarios(allScenarios);
    } catch (error) {
      console.error('Error loading scenarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderScenarioItem = ({ item }: { item: Scenario }) => (
    <TouchableOpacity 
      style={[styles.scenarioItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => console.log('Navigate to scenario detail:', item.id)}
    >
      <View style={styles.scenarioHeader}>
        <Text style={[styles.scenarioTitle, { color: colors.text }]}>{item.title}</Text>
      </View>
      <Text style={[styles.scenarioSteps, { color: colors.textSecondary }]}>
        {item.steps.length} шагов
      </Text>
      <Text style={[styles.scenarioDuration, { color: colors.textSecondary }]}>
        {item.durationMin} мин
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Сценарии</Text>
      
      {loading ? (
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Загрузка...</Text>
      ) : scenarios.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          У вас пока нет сценариев
        </Text>
      ) : (
        <FlatList
          data={scenarios}
          renderItem={renderScenarioItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  listContent: {
    paddingBottom: 16,
  },
  scenarioItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scenarioSteps: {
    fontSize: 14,
    marginBottom: 4,
  },
  scenarioDuration: {
    fontSize: 14,
  },
});

export default ScenariosScreen;