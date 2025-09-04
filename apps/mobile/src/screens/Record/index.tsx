import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '@/theming/hooks';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';

type RecordRouteProp = RouteProp<{
  Record: { recordId?: string };
}, 'Record'>;

export const RecordScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RecordRouteProp>();
  const { recordId } = route.params || {};
  
  const [mood, setMood] = useState<number>(0); // -2 to 2
  const [obstacles, setObstacles] = useState<string[]>([]);
  const [taskCompletion, setTaskCompletion] = useState<boolean[]>([true, false, true]);
  const [coachCommentary, setCoachCommentary] = useState('Хорошая работа сегодня. Постарайся быть более последовательным завтра.');
  const [dayLog, setDayLog] = useState([
    { status: true, time: '08:30', description: 'Утренняя медитация' },
    { status: true, time: '10:15', description: 'Фокус-сессия 25 мин' },
    { status: false, time: '14:20', description: 'Пропущенная задача' },
    { status: true, time: '16:45', description: 'Физические упражнения' },
  ]);
  
  // Mock recent records
  const [recentRecords, setRecentRecords] = useState([
    { id: '022', date: '2025-09-03', completed: true },
    { id: '021', date: '2025-09-02', completed: true },
    { id: '020', date: '2025-09-01', completed: false },
    { id: '019', date: '2025-08-31', completed: true },
    { id: '018', date: '2025-08-30', completed: true },
    { id: '017', date: '2025-08-29', completed: false },
    { id: '016', date: '2025-08-28', completed: true },
  ]);
  
  const availableObstacles = [
    'Усталость', 'Отсутствие мотивации', 'Внешние отвлечения', 
    'Внутренние мысли', 'Технические проблемы', 'Нехватка времени'
  ];
  
  const taskItems = [
    'Минимум фокуса (15-20 мин)',
    'Прочитать +10 страниц',
    'Завершить важный проект'
  ];

  const toggleObstacle = (obstacle: string) => {
    if (obstacles.includes(obstacle)) {
      setObstacles(obstacles.filter(o => o !== obstacle));
    } else {
      setObstacles([...obstacles, obstacle]);
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const newCompletion = [...taskCompletion];
    newCompletion[index] = !newCompletion[index];
    setTaskCompletion(newCompletion);
  };

  const saveRecord = () => {
    Alert.alert(
      'Запись сохранена',
      'Ваша запись дня была успешно сохранена.',
      [{ text: 'OK' }]
    );
  };

  const navigateToProtocols = () => {
    // @ts-ignore
    navigation.navigate('Protocols');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Запись №{recordId || '023'} (2025-09-04)</Text>
      
      {/* Mood Selection */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Настроение</Text>
        <View style={styles.moodContainer}>
          {[-2, -1, 0, 1, 2].map((moodValue) => (
            <TouchableOpacity
              key={moodValue}
              style={[
                styles.moodButton,
                mood === moodValue && styles.selectedMoodButton,
                { backgroundColor: colors.card, borderColor: colors.border }
              ]}
              onPress={() => setMood(moodValue)}
            >
              <Text style={[
                styles.moodText,
                { color: mood === moodValue ? colors.primary : colors.text }
              ]}>
                {moodValue === -2 ? '☹' : moodValue === -1 ? '☹' : moodValue === 0 ? '😐' : moodValue === 1 ? '🙂' : '🙂'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Obstacles */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Препятствия</Text>
        <View style={styles.obstaclesContainer}>
          {availableObstacles.map((obstacle, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.obstacleChip,
                obstacles.includes(obstacle) && styles.selectedObstacleChip,
                { backgroundColor: colors.card, borderColor: colors.border }
              ]}
              onPress={() => toggleObstacle(obstacle)}
            >
              <Text style={[
                styles.obstacleText,
                { color: obstacles.includes(obstacle) ? colors.primary : colors.text }
              ]}>
                {obstacle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Task Completion */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Выполнение задач</Text>
        {taskItems.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.taskItem, { borderBottomColor: colors.border }]}
            onPress={() => toggleTaskCompletion(index)}
          >
            <Text style={[styles.taskText, { color: colors.text }]}>
              {task}
            </Text>
            <Text style={[styles.taskStatus, { color: taskCompletion[index] ? colors.success : colors.error }]}>
              {taskCompletion[index] ? '✓' : '✗'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Day Log */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Лог дня</Text>
        <View style={styles.dayLogContainer}>
          {dayLog.map((log, index) => (
            <View key={index} style={[styles.logItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.logStatus, { color: log.status ? colors.success : colors.error }]}>
                {log.status ? '✓' : '✗'}
              </Text>
              <Text style={[styles.logTime, { color: colors.text }]}>{log.time}</Text>
              <Text style={[styles.logDescription, { color: colors.text }]}>{log.description}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Coach Commentary */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Комментарий коуча</Text>
        <Text style={[styles.commentary, { color: colors.text }]}>{coachCommentary}</Text>
      </View>
      
      {/* Recent Records */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>История записей</Text>
        <FlatList
          data={recentRecords}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.recordItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => console.log('Navigate to record:', item.id)}
            >
              <Text style={[styles.recordId, { color: colors.text }]}>{item.id}</Text>
              <Text style={[styles.recordDate, { color: colors.textSecondary }]}>{item.date}</Text>
              <Text style={[styles.recordStatus, { color: item.completed ? colors.success : colors.error }]}>
                {item.completed ? '✓' : '✗'}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          style={styles.recordsList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.card }]}
          onPress={saveRecord}
        >
          <Text style={[styles.actionButtonText, { color: colors.primary }]}>[ Сохранить запись ]</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={navigateToProtocols}
        >
          <Text style={[styles.actionButtonText, { color: colors.background }]}>[ Протоколы ]</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
  },
  selectedMoodButton: {
    borderWidth: 2,
  },
  moodText: {
    fontSize: 20,
  },
  obstaclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  obstacleChip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedObstacleChip: {
    borderWidth: 2,
  },
  obstacleText: {
    fontSize: 14,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  taskText: {
    fontSize: 16,
  },
  taskStatus: {
    fontSize: 16,
    fontWeight: '600',
  },
  dayLogContainer: {
    // Styles for day log container
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  logStatus: {
    fontSize: 16,
    width: 20,
  },
  logTime: {
    fontSize: 14,
    width: 50,
    marginRight: 12,
  },
  logDescription: {
    fontSize: 14,
    flex: 1,
  },
  commentary: {
    fontSize: 14,
    lineHeight: 20,
  },
  recordsList: {
    flexGrow: 0,
  },
  recordItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 100,
    alignItems: 'center',
  },
  recordId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  recordStatus: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
});

export default RecordScreen;