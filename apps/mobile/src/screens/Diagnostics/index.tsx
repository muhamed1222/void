import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '@/store/useStore';
import { useThemeColors } from '@/theming/hooks';

const DiagnosticsScreen = () => {
  const navigation = useNavigation();
  const { streak, disciplineScore, focusTime } = useStore();
  const colors = useThemeColors();
  const [indices, setIndices] = useState({
    mind: 75,
    body: 60,
    social: 80,
    discipline: disciplineScore
  });
  
  const [deltas, setDeltas] = useState({
    mind: 5,
    body: -3,
    social: 2,
    discipline: 0
  });
  
  // Mock event log data
  const [eventLog, setEventLog] = useState([
    { id: '1', status: true, time: '08:30', description: 'Утренняя медитация' },
    { id: '2', status: true, time: '10:15', description: 'Фокус-сессия 25 мин' },
    { id: '3', status: false, time: '14:20', description: 'Пропущенная задача' },
    { id: '4', status: true, time: '16:45', description: 'Физические упражнения' },
  ]);
  
  // Mock 7-day completion data
  const [sevenDayCompletion, setSevenDayCompletion] = useState([
    { day: 'Пн', completed: true },
    { day: 'Вт', completed: true },
    { day: 'Ср', completed: false },
    { day: 'Чт', completed: true },
    { day: 'Пт', completed: true },
    { day: 'Сб', completed: false },
    { day: 'Вс', completed: true },
  ]);
  
  // Mock coach commentary
  const [coachCommentary, setCoachCommentary] = useState('Хороший прогресс на этой неделе. Постарайся быть более последовательным в выполнении ежедневных задач.');

  const navigateToStatus = () => {
    // @ts-ignore
    navigation.navigate('Status');
  };

  const navigateToProtocols = () => {
    // @ts-ignore
    navigation.navigate('Protocols');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Диагностика</Text>
      
      {/* Daily Indices */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Индексы</Text>
        <View style={styles.indicesContainer}>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.mind}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Разум</Text>
            <Text style={[styles.delta, { color: deltas.mind >= 0 ? colors.success : colors.error }]}>
              {deltas.mind >= 0 ? '+' : ''}{deltas.mind}
            </Text>
          </View>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.body}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Тело</Text>
            <Text style={[styles.delta, { color: deltas.body >= 0 ? colors.success : colors.error }]}>
              {deltas.body >= 0 ? '+' : ''}{deltas.body}
            </Text>
          </View>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.social}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Социум</Text>
            <Text style={[styles.delta, { color: deltas.social >= 0 ? colors.success : colors.error }]}>
              {deltas.social >= 0 ? '+' : ''}{deltas.social}
            </Text>
          </View>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.discipline}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Дисциплина</Text>
            <Text style={[styles.delta, { color: deltas.discipline >= 0 ? colors.success : colors.error }]}>
              {deltas.discipline >= 0 ? '+' : ''}{deltas.discipline}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Event Log */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Лог событий</Text>
        {eventLog.map((event) => (
          <View key={event.id} style={[styles.eventItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.eventStatus, { color: event.status ? colors.success : colors.error }]}>
              {event.status ? '✓' : '✗'}
            </Text>
            <Text style={[styles.eventTime, { color: colors.text }]}>{event.time}</Text>
            <Text style={[styles.eventDescription, { color: colors.text }]}>{event.description}</Text>
          </View>
        ))}
      </View>
      
      {/* 7-Day Completion Bar */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>7 дней минимум</Text>
        <View style={styles.completionBar}>
          {sevenDayCompletion.map((day, index) => (
            <View key={index} style={styles.dayItem}>
              <Text style={[styles.dayLabel, { color: colors.text }]}>{day.day}</Text>
              <Text style={[styles.completionStatus, { color: day.completed ? colors.success : colors.error }]}>
                {day.completed ? '✓' : '✗'}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Coach Commentary */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Комментарий коуча</Text>
        <Text style={[styles.commentary, { color: colors.text }]}>{coachCommentary}</Text>
      </View>
      
      {/* Navigation Links */}
      <View style={[styles.section, styles.navigationSection]}>
        <TouchableOpacity onPress={navigateToStatus} style={styles.navButton}>
          <Text style={[styles.navButtonText, { color: colors.primary }]}>[ Системный статус ]</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProtocols} style={styles.navButton}>
          <Text style={[styles.navButtonText, { color: colors.primary }]}>[ Протоколы ]</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  indicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indexItem: {
    alignItems: 'center',
    flex: 1,
  },
  indexValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  indexLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  delta: {
    fontSize: 12,
    fontWeight: '500',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  eventStatus: {
    fontSize: 16,
    width: 20,
  },
  eventTime: {
    fontSize: 14,
    width: 50,
    marginRight: 12,
  },
  eventDescription: {
    fontSize: 14,
    flex: 1,
  },
  completionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  completionStatus: {
    fontSize: 16,
  },
  commentary: {
    fontSize: 14,
    lineHeight: 20,
  },
  navigationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
});

export default DiagnosticsScreen;