// Theme preview component

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from './ThemeProvider';
import { ThemedView, ThemedText, ThemedButton, ThemedInput, ThemedCard } from './ThemedComponents';

// Theme preview props
interface ThemePreviewProps {
  style?: any;
}

// Theme preview component
export const ThemePreview: React.FC<ThemePreviewProps> = ({ style }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <ScrollView style={[styles.container, style]}>
      <ThemedText type="h1" style={styles.title}>
        Theme Preview
      </ThemedText>
      
      <ThemedText type="body" style={styles.subtitle}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </ThemedText>
      
      {/* Color palette preview */}
      <ThemedCard style={styles.section}>
        <ThemedText type="h2" style={styles.sectionTitle}>
          Colors
        </ThemedText>
        
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.primary }]} />
          <ThemedText style={styles.colorLabel}>Primary</ThemedText>
        </View>
        
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.secondary }]} />
          <ThemedText style={styles.colorLabel}>Secondary</ThemedText>
        </View>
        
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.background }]} />
          <ThemedText style={styles.colorLabel}>Background</ThemedText>
        </View>
        
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: theme.colors.text }]} />
          <ThemedText style={styles.colorLabel}>Text</ThemedText>
        </View>
      </ThemedCard>
      
      {/* Typography preview */}
      <ThemedCard style={styles.section}>
        <ThemedText type="h2" style={styles.sectionTitle}>
          Typography
        </ThemedText>
        
        <ThemedText type="h1" style={styles.textSample}>
          Heading 1
        </ThemedText>
        
        <ThemedText type="h2" style={styles.textSample}>
          Heading 2
        </ThemedText>
        
        <ThemedText type="h3" style={styles.textSample}>
          Heading 3
        </ThemedText>
        
        <ThemedText type="body" style={styles.textSample}>
          Body text sample with some content to show the typography styles.
        </ThemedText>
        
        <ThemedText type="caption" style={styles.textSample}>
          Caption text sample
        </ThemedText>
      </ThemedCard>
      
      {/* Components preview */}
      <ThemedCard style={styles.section}>
        <ThemedText type="h2" style={styles.sectionTitle}>
          Components
        </ThemedText>
        
        <ThemedButton 
          title="Primary Button" 
          onPress={() => {}} 
          style={styles.button}
        />
        
        <ThemedInput 
          placeholder="Input field" 
          style={styles.input}
        />
      </ThemedCard>
      
      {/* Spacing preview */}
      <ThemedCard style={styles.section}>
        <ThemedText type="h2" style={styles.sectionTitle}>
          Spacing
        </ThemedText>
        
        <View style={styles.spacingPreview}>
          <View style={[styles.spacingBox, { width: theme.spacing.xs }]} />
          <ThemedText style={styles.spacingLabel}>xs ({theme.spacing.xs}px)</ThemedText>
        </View>
        
        <View style={styles.spacingPreview}>
          <View style={[styles.spacingBox, { width: theme.spacing.sm }]} />
          <ThemedText style={styles.spacingLabel}>sm ({theme.spacing.sm}px)</ThemedText>
        </View>
        
        <View style={styles.spacingPreview}>
          <View style={[styles.spacingBox, { width: theme.spacing.md }]} />
          <ThemedText style={styles.spacingLabel}>md ({theme.spacing.md}px)</ThemedText>
        </View>
        
        <View style={styles.spacingPreview}>
          <View style={[styles.spacingBox, { width: theme.spacing.lg }]} />
          <ThemedText style={styles.spacingLabel}>lg ({theme.spacing.lg}px)</ThemedText>
        </View>
      </ThemedCard>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  colorBox: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorLabel: {
    flex: 1,
  },
  textSample: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 5,
  },
  input: {
    marginVertical: 5,
  },
  spacingPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  spacingBox: {
    height: 20,
    backgroundColor: '#666',
    marginRight: 10,
  },
  spacingLabel: {
    flex: 1,
  },
});

// Export default
export default ThemePreview;