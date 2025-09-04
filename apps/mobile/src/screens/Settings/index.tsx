import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import { ROUTES } from '@/domain/constants';
import { useNavigation } from '@react-navigation/native';

export const SettingsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
      
      <TouchableOpacity 
        style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}
        onPress={() => navigation.navigate(ROUTES.STYLEGUIDE as never)}
      >
        <Text style={[styles.settingText, { color: theme.colors.text }]}>Style Guide</Text>
      </TouchableOpacity>
      
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        More settings will be added here
      </Text>
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
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default SettingsScreen;