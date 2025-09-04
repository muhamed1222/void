import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/theming/hooks';

export const StatusScreen = () => {
  const { colors } = useTheme();
  
  // Mock data for indices
  const [indices, setIndices] = useState({
    mind: 75,
    body: 60,
    social: 80,
    discipline: 85
  });
  
  // Mock data for weekly deltas
  const [weeklyDeltas, setWeeklyDeltas] = useState({
    mind: 5,
    body: -3,
    social: 2,
    discipline: 0
  });
  
  // Mock strategic coach output
  const [strategicCommentary, setStrategicCommentary] = useState(
    'На этой неделе вы показали хороший прогресс в области дисциплины и социальных взаимодействий. ' +
    'Постарайтесь уделить больше внимания физической активности в следующие 7 дней. ' +
    'Ваш уровень концентрации стабилен, продолжайте в том же духе.'
  );
  
  // Mock change history
  const [changeHistory, setChangeHistory] = useState([
    { date: '2025-09-01', mind: 70, body: 62, social: 78, discipline: 83 },
    { date: '2025-08-25', mind: 68, body: 65, social: 75, discipline: 80 },
    { date: '2025-08-18', mind: 65, body: 63, social: 72, discipline: 78 },
    { date: '2025-08-11', mind: 62, body: 60, social: 70, discipline: 75 },
    { date: '2025-08-04', mind: 60, body: 58, social: 68, discipline: 72 },
    { date: '2025-07-28', mind: 58, body: 55, social: 65, discipline: 70 },
    { date: '2025-07-21', mind: 55, body: 53, social: 62, discipline: 68 },
  ]);

  const renderHistoryItem = ({ item }: { item: any }) => (
    <View style={[styles.historyRow, { borderBottomColor: colors.border }]}>
      <Text style={[styles.historyDate, { color: colors.text }]}>{item.date}</Text>
      <Text style={[styles.historyValue, { color: colors.text }]}>{item.mind}</Text>
      <Text style={[styles.historyValue, { color: colors.text }]}>{item.body}</Text>
      <Text style={[styles.historyValue, { color: colors.text }]}>{item.social}</Text>
      <Text style={[styles.historyValue, { color: colors.text }]}>{item.discipline}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Системный статус</Text>
      
      {/* Indices Dashboard */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Индексы</Text>
        <View style={styles.indicesContainer}>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.mind}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Разум</Text>
          </View>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.body}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Тело</Text>
          </View>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.social}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Социум</Text>
          </View>
          <View style={styles.indexItem}>
            <Text style={[styles.indexValue, { color: colors.text }]}>{indices.discipline}</Text>
            <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>Дисциплина</Text>
          </View>
        </View>
      </View>
      
      {/* Weekly Deltas */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Еженедельные изменения</Text>
        <View style={styles.deltasContainer}>
          <View style={styles.deltaItem}>
            <Text style={[styles.deltaLabel, { color: colors.textSecondary }]}>Разум</Text>
            <Text style={[styles.deltaValue, { color: colors.text }]}>{weeklyDeltas.mind >= 0 ? '+' : ''}{weeklyDeltas.mind}</Text>
          </View>
          <View style={styles.deltaItem}>
            <Text style={[styles.deltaLabel, { color: colors.textSecondary }]}>Тело</Text>
            <Text style={[styles.deltaValue, { color: colors.text }]}>{weeklyDeltas.body >= 0 ? '+' : ''}{weeklyDeltas.body}</Text>
          </View>
          <View style={styles.deltaItem}>
            <Text style={[styles.deltaLabel, { color: colors.textSecondary }]}>Социум</Text>
            <Text style={[styles.deltaValue, { color: colors.text }]}>{weeklyDeltas.social >= 0 ? '+' : ''}{weeklyDeltas.social}</Text>
          </View>
          <View style={styles.deltaItem}>
            <Text style={[styles.deltaLabel, { color: colors.textSecondary }]}>Дисциплина</Text>
            <Text style={[styles.deltaValue, { color: colors.text }]}>{weeklyDeltas.discipline >= 0 ? '+' : ''}{weeklyDeltas.discipline}</Text>
          </View>
        </View>
      </View>
      
      {/* Strategic Commentary */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Стратегический комментарий</Text>
        <Text style={[styles.commentary, { color: colors.text }]}>{strategicCommentary}</Text>
      </View>
      
      {/* Change History */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>История изменений</Text>
        <View style={[styles.historyHeader, { borderBottomColor: colors.border }]}>
          <Text style={[styles.historyHeaderDate, { color: colors.textSecondary }]}>Дата</Text>
          <Text style={[styles.historyHeaderValue, { color: colors.textSecondary }]}>Разум</Text>
          <Text style={[styles.historyHeaderValue, { color: colors.textSecondary }]}>Тело</Text>
          <Text style={[styles.historyHeaderValue, { color: colors.textSecondary }]}>Социум</Text>
          <Text style={[styles.historyHeaderValue, { color: colors.textSecondary }]}>Дисциплина</Text>
        </View>
        <FlatList
          data={changeHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.date}
          style={styles.historyList}
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
  },
  deltasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deltaItem: {
    alignItems: 'center',
    flex: 1,
  },
  deltaLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  deltaValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  commentary: {
    fontSize: 14,
    lineHeight: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  historyHeaderDate: {
    fontSize: 14,
    fontWeight: '500',
    width: 100,
  },
  historyHeaderValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  historyList: {
    maxHeight: 200,
  },
  historyRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  historyDate: {
    fontSize: 14,
    width: 100,
  },
  historyValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
});

export default StatusScreen;