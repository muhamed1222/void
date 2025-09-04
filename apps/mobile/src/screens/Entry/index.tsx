import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { useTheme } from '@/theming/hooks';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/domain/constants';

export const EntryScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { userId, hasAssignedId, setUserId, setHasAssignedId } = useStore();
  const [localUserId, setLocalUserId] = useState<string | null>(null);

  // Generate a unique user ID in the format User#<XXX>
  const generateUserId = (): string => {
    const timestamp = Date.now();
    const hash = (timestamp % 1000).toString().padStart(3, '0');
    return `User#${hash}`;
  };

  useEffect(() => {
    // Check if user ID already exists
    if (hasAssignedId && userId) {
      // If ID exists, navigate to Today screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } else {
      // If no ID exists, generate a new one
      const newUserId = generateUserId();
      setUserId(newUserId);
      setHasAssignedId(true);
      setLocalUserId(newUserId);
    }
  }, [hasAssignedId, userId, navigation, setUserId, setHasAssignedId]);

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  // Show loading state while checking for existing ID
  if (!localUserId && !hasAssignedId) {
    return (
      <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
        <Text style={[styles.loadingText, { color: '#000000', fontFamily: 'monospace' }]}>
          Assigning ID...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <Text style={[styles.title, { color: '#000000', fontFamily: 'monospace' }]}>
        Assigning ID...
      </Text>
      <Text style={[styles.userId, { color: '#000000', fontFamily: 'monospace' }]}>
        {localUserId || userId}
      </Text>
      <Text style={[styles.accessText, { color: '#000000', fontFamily: 'monospace' }]}>
        Допуск предоставлен.
      </Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={[styles.buttonText, { color: '#000000', fontFamily: 'monospace' }]}>
          [ Войти ]
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  userId: {
    fontSize: 16,
    marginBottom: 8,
  },
  accessText: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    padding: 12,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default EntryScreen;