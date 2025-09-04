import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/theming/hooks';
import { protocolsService } from '@/services/protocols';
import { Protocol } from '@/domain/types';
import { formatDomain } from '@/utils/fmt';

export const ProtocolsScreen = () => {
  const { colors } = useTheme();
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDomain, setActiveDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProtocols();
  }, []);

  useEffect(() => {
    filterProtocols();
  }, [protocols, activeDomain, searchQuery]);

  const loadProtocols = async () => {
    try {
      // For now, we'll create some sample protocols if none exist
      let allProtocols = await protocolsService.getAllProtocols();
      
      if (allProtocols.length === 0) {
        // Create sample protocols
        const sampleProtocols: Protocol[] = [
          {
            id: '001',
            title: 'Утренний ритуал',
            domain: 'mind',
            durationMin: 15,
            level: 1,
            steps: [
              'Медитация 5 минут',
              'Планирование дня',
              'Зарядка'
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '002',
            title: 'Физическая активность',
            domain: 'body',
            durationMin: 30,
            level: 2,
            steps: [
              'Разминка 5 минут',
              'Основная тренировка 20 минут',
              'Растяжка 5 минут'
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '003',
            title: 'Социальное взаимодействие',
            domain: 'social',
            durationMin: 20,
            level: 1,
            steps: [
              'Позвонить близкому человеку',
              'Обсудить важный вопрос',
              'Поблагодарить за поддержку'
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '004',
            title: 'Глубокая концентрация',
            domain: 'mind',
            durationMin: 45,
            level: 3,
            steps: [
              'Подготовка рабочего места',
              'Фокус-сессия 25 минут',
              'Перерыв 5 минут',
              'Фокус-сессия 25 минут',
              'Анализ результатов'
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        
        // Save sample protocols
        for (const protocol of sampleProtocols) {
          await protocolsService.saveProtocol(protocol);
        }
        
        allProtocols = sampleProtocols;
      }
      
      setProtocols(allProtocols);
    } catch (error) {
      console.error('Error loading protocols:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProtocols = () => {
    let result = protocols;
    
    // Filter by domain
    if (activeDomain !== 'all') {
      result = result.filter(protocol => protocol.domain === activeDomain);
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(protocol => 
        protocol.id.toLowerCase().includes(lowerQuery) ||
        protocol.title.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredProtocols(result);
  };

  const renderProtocolItem = ({ item }: { item: Protocol }) => (
    <TouchableOpacity 
      style={[styles.protocolItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => console.log('Navigate to protocol detail:', item.id)}
    >
      <View style={styles.protocolHeader}>
        <Text style={[styles.protocolId, { color: colors.textSecondary }]}>{item.id}</Text>
        <Text style={[styles.protocolTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.protocolDuration, { color: colors.textSecondary }]}>{item.durationMin} мин</Text>
        <Text style={[styles.protocolLevel, { color: colors.primary }]}>Уровень {item.level}</Text>
      </View>
      <View style={styles.protocolFooter}>
        <Text style={[styles.protocolDomain, { color: colors.textSecondary }]}>
          {formatDomain(item.domain)}
        </Text>
        <TouchableOpacity 
          style={styles.launchButton}
          onPress={() => console.log('Launch protocol:', item.id)}
        >
          <Text style={[styles.launchButtonText, { color: colors.primary }]}>[ Запустить ]</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Каталог протоколов</Text>
      
      {/* Domain Filter */}
      <View style={[styles.filterContainer, { backgroundColor: colors.backgroundSecondary }]}>
        <TouchableOpacity 
          style={[styles.filterButton, activeDomain === 'all' && styles.activeFilterButton]}
          onPress={() => setActiveDomain('all')}
        >
          <Text style={[styles.filterButtonText, { color: activeDomain === 'all' ? colors.primary : colors.text }]}>
            Все
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeDomain === 'mind' && styles.activeFilterButton]}
          onPress={() => setActiveDomain('mind')}
        >
          <Text style={[styles.filterButtonText, { color: activeDomain === 'mind' ? colors.primary : colors.text }]}>
            Разум
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeDomain === 'body' && styles.activeFilterButton]}
          onPress={() => setActiveDomain('body')}
        >
          <Text style={[styles.filterButtonText, { color: activeDomain === 'body' ? colors.primary : colors.text }]}>
            Тело
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeDomain === 'social' && styles.activeFilterButton]}
          onPress={() => setActiveDomain('social')}
        >
          <Text style={[styles.filterButtonText, { color: activeDomain === 'social' ? colors.primary : colors.text }]}>
            Социум
          </Text>
        </TouchableOpacity>
      </View>
      
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
      
      {/* Protocol List */}
      {loading ? (
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Загрузка...</Text>
      ) : filteredProtocols.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Протоколы не найдены
        </Text>
      ) : (
        <FlatList
          data={filteredProtocols}
          renderItem={renderProtocolItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      {/* Command Input */}
      <View style={[styles.commandContainer, { borderColor: colors.border }]}>
        <Text style={[styles.commandLabel, { color: colors.textSecondary }]}>Команда запуска:</Text>
        <TextInput
          style={[styles.commandInput, { color: colors.text }]}
          placeholder="> start 001"
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
  },
  activeFilterButton: {
    borderBottomWidth: 2,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
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
  protocolItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  protocolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  protocolId: {
    fontSize: 14,
    fontWeight: '600',
  },
  protocolTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginHorizontal: 8,
  },
  protocolDuration: {
    fontSize: 14,
  },
  protocolLevel: {
    fontSize: 14,
    fontWeight: '500',
  },
  protocolFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  protocolDomain: {
    fontSize: 14,
  },
  launchButton: {
    padding: 4,
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

export default ProtocolsScreen;