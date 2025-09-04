import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/theming/hooks';
import { scenariosService } from '@/services/scenarios';
import { Scenario } from '@/domain/types';

export const ScenariosScreen = () => {
  const { colors } = useTheme();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      // For now, we'll create some sample scenarios if none exist
      let allScenarios = await scenariosService.getAllScenarios();
      
      if (allScenarios.length === 0) {
        // Create sample scenarios
        const sampleScenarios: Scenario[] = [
          {
            id: '01',
            title: 'Утренний ритуал',
            steps: [
              'Проснуться в установленное время',
              'Выпить стакан воды',
              'Сделать 5 минут медитации',
              'Планирование дня',
              'Легкая физическая активность'
            ],
            durationMin: 30,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '02',
            title: 'Дневной фокус',
            steps: [
              'Подготовка рабочего места',
              'Фокус-сессия 25 минут',
              'Перерыв 5 минут',
              'Фокус-сессия 25 минут',
              'Анализ результатов'
            ],
            durationMin: 60,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '03',
            title: 'Вечерний ритуал',
            steps: [
              'Завершение текущих задач',
              'Планирование следующего дня',
              'Отключение от электроники',
              'Подготовка к сну',
              'Медитация на 10 минут'
            ],
            durationMin: 45,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        
        // Save sample scenarios
        for (const scenario of sampleScenarios) {
          await scenariosService.saveScenario(scenario);
        }
        
        allScenarios = sampleScenarios;
      }
      
      setScenarios(allScenarios);
    } catch (error) {
      console.error('Error loading scenarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredScenarios = scenarios.filter(scenario => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return scenario.id.toLowerCase().includes(lowerQuery) || 
           scenario.title.toLowerCase().includes(lowerQuery);
  });

  const renderScenarioItem = ({ item }: { item: Scenario }) => (
    <TouchableOpacity 
      style={[styles.scenarioItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => console.log('Navigate to scenario detail:', item.id)}
    >
      <View style={styles.scenarioHeader}>
        <Text style={[styles.scenarioId, { color: colors.textSecondary }]}>{item.id}</Text>
        <Text style={[styles.scenarioTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.scenarioDuration, { color: colors.textSecondary }]}>{item.durationMin} мин</Text>
      </View>
      <Text style={[styles.scenarioSteps, { color: colors.textSecondary }]}>
        {item.steps.length} шагов
      </Text>
      <TouchableOpacity 
        style={styles.launchButton}
        onPress={() => console.log('Launch scenario:', item.id)}
      >
        <Text style={[styles.launchButtonText, { color: colors.primary }]}>[ Запустить ]</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Сценарии</Text>
      
      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Поиск по ID или названию..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {loading ? (
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Загрузка...</Text>
      ) : filteredScenarios.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Сценарии не найдены
        </Text>
      ) : (
        <FlatList
          data={filteredScenarios}
          renderItem={renderScenarioItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      {/* Command Input */}
      <View style={[styles.commandContainer, { borderColor: colors.border }]}>
        <Text style={[styles.commandLabel, { color: colors.textSecondary }]}>Команда запуска:</Text>
        <TextInput
          style={[styles.commandInput, { color: colors.text }]}
          placeholder="> start 01"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
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
  searchContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    padding: 12,
    fontSize: 16,
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
  scenarioId: {
    fontSize: 14,
    fontWeight: '600',
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginHorizontal: 8,
  },
  scenarioDuration: {
    fontSize: 14,
  },
  scenarioSteps: {
    fontSize: 14,
    marginBottom: 12,
  },
  launchButton: {
    alignSelf: 'flex-start',
  },
  launchButtonText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  commandContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  commandLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  commandInput: {
    fontSize: 16,
    fontFamily: 'monospace',
  },
});

export default ScenariosScreen;