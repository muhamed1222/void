import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theming/hooks';
import { protocolsService } from '@/services/protocols';
import { Protocol } from '@/domain/types';
import { formatDomain } from '@/utils/fmt';

export const ProtocolsScreen = () => {
  const { colors } = useTheme();
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProtocols();
  }, []);

  const loadProtocols = async () => {
    try {
      const allProtocols = await protocolsService.getAllProtocols();
      setProtocols(allProtocols);
    } catch (error) {
      console.error('Error loading protocols:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProtocolItem = ({ item }: { item: Protocol }) => (
    <TouchableOpacity 
      style={[styles.protocolItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => console.log('Navigate to protocol detail:', item.id)}
    >
      <View style={styles.protocolHeader}>
        <Text style={[styles.protocolTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.protocolLevel, { color: colors.primary }]}>{item.level}</Text>
      </View>
      <Text style={[styles.protocolDomain, { color: colors.textSecondary }]}>
        {formatDomain(item.domain)}
      </Text>
      <Text style={[styles.protocolDuration, { color: colors.textSecondary }]}>
        {item.durationMin} мин
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Протоколы</Text>
      
      {loading ? (
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Загрузка...</Text>
      ) : protocols.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          У вас пока нет протоколов
        </Text>
      ) : (
        <FlatList
          data={protocols}
          renderItem={renderProtocolItem}
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
  protocolTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  protocolLevel: {
    fontSize: 16,
    fontWeight: '500',
  },
  protocolDomain: {
    fontSize: 14,
    marginBottom: 4,
  },
  protocolDuration: {
    fontSize: 14,
  },
});

export default ProtocolsScreen;