import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/theming/hooks';

export const DocsScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Протокол №00: Документация</Text>
      
      {/* Document Briefing */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Краткое описание</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Этот документ представляет собой руководство по использованию системы "White Room". 
          Протокол №00 объясняет основные принципы работы системы, индексы и правила взаимодействия 
          с коучем для достижения максимальной эффективности.
        </Text>
      </View>
      
      {/* Index Explanation */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Индексы</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Система использует четыре ключевых индекса для отслеживания вашего прогресса:
        </Text>
        
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
            <Text style={[styles.listText, { color: colors.text }]}>
              <Text style={styles.bold}>Разум (Mind)</Text> - уровень когнитивной активности и интеллектуального развития
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
            <Text style={[styles.listText, { color: colors.text }]}>
              <Text style={styles.bold}>Тело (Body)</Text> - физическое состояние и уровень активности
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
            <Text style={[styles.listText, { color: colors.text }]}>
              <Text style={styles.bold}>Социум (Social)</Text> - качество социальных взаимодействий и связей
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
            <Text style={[styles.listText, { color: colors.text }]}>
              <Text style={styles.bold}>Дисциплина (Discipline)</Text> - способность следовать установленным правилам и планам
            </Text>
          </View>
        </View>
      </View>
      
      {/* Rules */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Правила</Text>
        
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={[styles.bullet, { color: colors.primary }]}>1.</Text>
            <Text style={[styles.listText, { color: colors.text }]}>
              <Text style={styles.bold}>Минимум 15-20 минут</Text> - каждый день необходимо выделять 
              минимум 15-20 минут на фокусированную работу или развитие
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.bullet, { color: colors.primary }]}>2.</Text>
            <Text style={[styles.listText, { color: colors.text }]}>
              <Text style={styles.bold}>Перерывы записываются</Text> - все перерывы и отвлечения 
              должны быть зафиксированы в системе для точного анализа продуктивности
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.bullet, { color: colors.primary }]}>3.</Text>
            <Text style={[styles.listText, { color: colors.text }]}>
              <Text style={styles.bold}>Коуч ежедневно корректирует нагрузку</Text> - система автоматически 
              адаптирует планы и задачи на основе вашего прогресса и текущего состояния
            </Text>
          </View>
        </View>
      </View>
      
      {/* Additional Information */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Дополнительная информация</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Протокол №00 доступен при первом запуске приложения и в любое время через раздел "Настройки". 
          Рекомендуется ознакомиться с этим документом перед началом работы с системой.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 16,
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
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    minWidth: 16,
  },
  listText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  bold: {
    fontWeight: '600',
  },
});

export default DocsScreen;