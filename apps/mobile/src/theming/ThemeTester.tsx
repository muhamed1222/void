// Theme tester component

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from './ThemeProvider';
import { ThemedView, ThemedText, ThemedButton } from './ThemedComponents';
import ThemeSwitcher from './ThemeSwitcher';
import ThemePreview from './ThemePreview';

// Theme tester props
interface ThemeTesterProps {
  style?: any;
}

// Theme tester component
export const ThemeTester: React.FC<ThemeTesterProps> = ({ style }) => {
  const { theme } = useTheme();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <ThemedView style={[styles.container, style]}>
      <ThemedText type="h1" style={styles.title}>
        Theme Tester
      </ThemedText>
      
      <View style={styles.controls}>
        <ThemeSwitcher />
        
        <ThemedButton 
          title={showPreview ? "Hide Preview" : "Show Preview"} 
          onPress={() => setShowPreview(!showPreview)} 
          style={styles.toggleButton}
        />
      </View>
      
      {showPreview && (
        <View style={styles.previewContainer}>
          <ThemePreview />
        </View>
      )}
      
      <ThemedView style={styles.infoSection}>
        <ThemedText type="h2" style={styles.sectionTitle}>
          Theme Information
        </ThemedText>
        
        <ThemedText style={styles.infoText}>
          Current theme: {theme === theme.light ? 'Light' : 'Dark'}
        </ThemedText>
        
        <ThemedText style={styles.infoText}>
          Primary color: {theme.colors.primary}
        </ThemedText>
        
        <ThemedText style={styles.infoText}>
          Background color: {theme.colors.background}
        </ThemedText>
        
        <ThemedText style={styles.infoText}>
          Text color: {theme.colors.text}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  toggleButton: {
    minWidth: 120,
  },
  previewContainer: {
    flex: 1,
    marginVertical: 20,
  },
  infoSection: {
    marginVertical: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sectionTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    marginVertical: 5,
  },
});

// Export default
export default ThemeTester;