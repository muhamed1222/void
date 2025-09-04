import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@/theming/hooks';
import { scenariosService } from '@/services/scenarios';
import { Scenario } from '@/domain/types';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

type ScenarioDetailRouteProp = RouteProp<{
  ScenarioDetail: { scenarioId: string };
}, 'ScenarioDetail'>;

export const ScenarioDetailScreen = () => {
  const { colors } = useTheme();
  const route = useRoute<ScenarioDetailRouteProp>();
  const navigation = useNavigation();
  const { scenarioId } = route.params;
  
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    loadScenario();
  }, [scenarioId]);

  const loadScenario = async () => {
    try {
      setLoading(true);
      const loadedScenario = await scenariosService.getScenarioById(scenarioId);
      setScenario(loadedScenario);
    } catch (error) {
      console.error('Error loading scenario:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить сценарий');
    } finally {
      setLoading(false);
    }
  };

  const startScenario = () => {
    if (!scenario) return;
    
    setIsExecuting(true);
    setCurrentStep(0);
    Alert.alert(
      'Сценарий запущен',
      `Начинаем выполнение сценария "${scenario.title}"\n\nСледуйте инструкциям пошагово.`,
      [{ text: 'Начать' }]
    );
  };

  const nextStep = () => {
    if (!scenario) return;
    
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Scenario completed
      setIsExecuting(false);
      Alert.alert(
        'Сценарий завершен',
        `Поздравляем! Вы успешно завершили сценарий "${scenario.title}".`,
        [{ text: 'Закрыть', onPress: () => navigation.goBack() }]
      );
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Загрузка сценария...</Text>
      </View>
    );
  }

  if (!scenario) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Сценарий не найден</Text>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: colors.primary }]}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{scenario.title}</Text>
      
      <View style={[styles.scenarioInfo, { backgroundColor: colors.backgroundSecondary }]}>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>ID:</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{scenario.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Длительность:</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{scenario.durationMin} мин</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Шагов:</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>{scenario.steps.length}</Text>
        </View>
      </View>
      
      {!isExecuting ? (
        <>
          <Text style={[styles.stepsTitle, { color: colors.text }]}>Шаги выполнения</Text>
          <FlatList
            data={scenario.steps}
            renderItem={({ item, index }) => (
              <View 
                style={[styles.stepItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                key={index.toString()}
              >
                <Text style={[styles.stepNumber, { color: colors.primary }]}>{index + 1}.</Text>
                <Text style={[styles.stepText, { color: colors.text }]}>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.stepsList}
          />
          
          <TouchableOpacity 
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            onPress={startScenario}
          >
            <Text style={[styles.startButtonText, { color: colors.background }]}>[ Запустить сценарий ]</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={[styles.progressContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <Text style={[styles.progressText, { color: colors.text }]}>
              Шаг {currentStep + 1} из {scenario.steps.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: colors.primary,
                    width: `${((currentStep + 1) / scenario.steps.length) * 100}%`
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={[styles.currentStep, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.stepNumberLarge, { color: colors.primary }]}>{currentStep + 1}.</Text>
            <Text style={[styles.stepTextLarge, { color: colors.text }]}>
              {scenario.steps[currentStep]}
            </Text>
          </View>
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, { backgroundColor: colors.card }]}
              onPress={previousStep}
              disabled={currentStep === 0}
            >
              <Text style={[
                styles.navButtonText, 
                { 
                  color: currentStep === 0 ? colors.textSecondary : colors.primary 
                }
              ]}>
                [ Назад ]
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, { backgroundColor: colors.primary }]}
              onPress={nextStep}
            >
              <Text style={[styles.navButtonText, { color: colors.background }]}>
                {currentStep === scenario.steps.length - 1 ? '[ Завершить ]' : '[ Далее ]'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scenarioInfo: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  stepsList: {
    flex: 1,
    marginBottom: 16,
  },
  stepItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  stepText: {
    fontSize: 16,
    flex: 1,
  },
  startButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  progressContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  progressText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  currentStep: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  stepNumberLarge: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  stepTextLarge: {
    fontSize: 18,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  backButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
});

export default ScenarioDetailScreen;