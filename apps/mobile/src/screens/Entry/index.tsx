import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { useThemeColors } from '@/theming/hooks';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/domain/constants';

export const EntryScreen = () => {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const { userId, hasAssignedId, setUserId, setHasAssignedId } = useStore();
  const [localUserId, setLocalUserId] = useState<string | null>(null);

  // Generate a unique user ID in the format User#<XXX>
  const generateUserId = (): string => {
    // Generate a random 3-digit number
    const randomNumber = Math.floor(100 + Math.random() * 900);
    return `User#${randomNumber}`;
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

  // If user already has an ID, don't show the entry screen content
  if (hasAssignedId && userId) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.userId, { color: colors.text }]}>
        {localUserId || userId}
      </Text>
      <Text style={[styles.accessText, { color: colors.text }]}>
        Допуск предоставлен.
      </Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={[styles.buttonText, { color: colors.text }]}>
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
  userId: {
    fontSize: 16,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  accessText: {
    fontSize: 16,
    fontFamily: 'monospace',
    marginBottom: 24,
  },
  button: {
    padding: 12,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'monospace',
  },
});

export default EntryScreen;