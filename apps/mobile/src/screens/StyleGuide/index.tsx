import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Clipboard, 
  Alert, 
  Dimensions,
  Platform
} from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import { colorPalette, themeColors, getColorWithOpacity, adjustColor, getContrastTextColor, colorUtils } from '@/theming/colors';
import { typography, textStyles, typographyScale } from '@/theming/typography';
import { spacing, borderRadius, borderWidths } from '@/theming/spacing';
import { 
  ThemedView, 
  ThemedText, 
  ThemedButton, 
  ThemedInput, 
  ThemedCard, 
  ThemedDivider,
  ThemedScrollView
} from '@/theming/ThemedComponents';

// Define route constant for StyleGuide
export const STYLEGUIDE_ROUTE = 'StyleGuide';

const StyleGuideScreen: React.FC = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const [copyStatus, setCopyStatus] = useState<{[key: string]: boolean}>({});
  const [inputValue, setInputValue] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);
  
  // Handle copying color HEX value to clipboard
  const handleCopyColor = (colorName: string, hexValue: string) => {
    Clipboard.setString(hexValue);
    setCopyStatus({ ...copyStatus, [colorName]: true });
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, [colorName]: false });
    }, 2000);
  };

  // Get all colors for display
  const getAllColors = () => {
    const colors = theme.colors;
    return Object.entries(colors).map(([name, value]) => ({
      name,
      value
    }));
  };

  // Get all typography specimens
  const getAllTypography = () => {
    return Object.entries(textStyles).map(([name, style]) => ({
      name,
      style
    }));
  };

  // Get responsive examples
  const getResponsiveExamples = () => {
    const { width } = Dimensions.get('window');
    let screenType: 'mobile' | 'tablet' | 'desktop' = 'mobile';
    
    if (width >= 1024) {
      screenType = 'desktop';
    } else if (width >= 768) {
      screenType = 'tablet';
    }
    
    return {
      width,
      screenType,
      examples: [
        { name: 'Mobile', minWidth: 0, maxWidth: 767 },
        { name: 'Tablet', minWidth: 768, maxWidth: 1023 },
        { name: 'Desktop', minWidth: 1024, maxWidth: Infinity }
      ]
    };
  };

  const responsiveInfo = getResponsiveExamples();

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Style Guide</ThemedText>
        <ThemedButton 
          title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"} 
          onPress={toggleTheme} 
        />
      </ThemedView>

      {/* Color Palette Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Color Palette</ThemedText>
        <ThemedView style={styles.themeToggleContainer}>
          <ThemedText>Current Theme: {isDarkMode ? 'Dark' : 'Light'}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.colorGrid}>
          {getAllColors().map((color) => (
            <TouchableOpacity
              key={color.name}
              style={[styles.colorSwatch, { backgroundColor: color.value }]}
              onPress={() => handleCopyColor(color.name, color.value)}
            >
              <ThemedView style={styles.colorInfo}>
                <ThemedText style={[styles.colorName, { color: getContrastTextColor(color.value) }]}>
                  {color.name}
                </ThemedText>
                <ThemedText style={[styles.hexValue, { color: getContrastTextColor(color.value) }]}>
                  {color.value}
                </ThemedText>
                <ThemedText style={[styles.copyStatus, { color: getContrastTextColor(color.value) }]}>
                  {copyStatus[color.name] ? 'Copied!' : 'Tap to copy'}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Typography Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Typography</ThemedText>
        <ThemedView style={styles.typographyContainer}>
          {getAllTypography().map((typography) => (
            <ThemedView key={typography.name} style={styles.typographyItem}>
              <ThemedText style={[typography.style, styles.typographyExample]}>
                The quick brown fox jumps over the lazy dog
              </ThemedText>
              <ThemedText style={styles.typographyName}>{typography.name}</ThemedText>
              <ThemedText style={styles.typographyDetails}>
                {`Font Size: ${typography.style.fontSize || 'N/A'} | Line Height: ${typography.style.lineHeight || 'N/A'}`}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Component Library Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Component Library</ThemedText>
        
        {/* ThemedView Example */}
        <ThemedView style={styles.componentExample}>
          <ThemedText style={styles.componentTitle}>ThemedView</ThemedText>
          <ThemedView style={styles.componentDemo}>
            <ThemedView style={styles.demoView}>
              <ThemedText>Themed View Example</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedText style={styles.componentCode}>
            {`<ThemedView style={styles.container}>
  <ThemedText>Content</ThemedText>
</ThemedView>`}
          </ThemedText>
        </ThemedView>
        
        {/* ThemedText Example */}
        <ThemedView style={styles.componentExample}>
          <ThemedText style={styles.componentTitle}>ThemedText</ThemedText>
          <ThemedView style={styles.componentDemo}>
            <ThemedText type="h1">Heading 1</ThemedText>
            <ThemedText type="h2">Heading 2</ThemedText>
            <ThemedText type="h3">Heading 3</ThemedText>
            <ThemedText type="body">Body Text</ThemedText>
            <ThemedText type="caption">Caption Text</ThemedText>
          </ThemedView>
          <ThemedText style={styles.componentCode}>
            {`<ThemedText type="h1">Heading 1</ThemedText>
<ThemedText type="body">Body Text</ThemedText>`}
          </ThemedText>
        </ThemedView>
        
        {/* ThemedButton Example */}
        <ThemedView style={styles.componentExample}>
          <ThemedText style={styles.componentTitle}>ThemedButton</ThemedText>
          <ThemedView style={styles.componentDemo}>
            <ThemedButton 
              title={buttonPressed ? "Pressed!" : "Click Me"} 
              onPress={() => setButtonPressed(!buttonPressed)} 
            />
          </ThemedView>
          <ThemedText style={styles.componentCode}>
            {`<ThemedButton 
  title="Click Me" 
  onPress={handlePress} 
/>`}
          </ThemedText>
        </ThemedView>
        
        {/* ThemedInput Example */}
        <ThemedView style={styles.componentExample}>
          <ThemedText style={styles.componentTitle}>ThemedInput</ThemedText>
          <ThemedView style={styles.componentDemo}>
            <ThemedInput 
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter text here"
            />
          </ThemedView>
          <ThemedText style={styles.componentCode}>
            {`<ThemedInput 
  value={value}
  onChangeText={setValue}
  placeholder="Enter text"
/>`}
          </ThemedText>
        </ThemedView>
        
        {/* ThemedCard Example */}
        <ThemedView style={styles.componentExample}>
          <ThemedText style={styles.componentTitle}>ThemedCard</ThemedText>
          <ThemedView style={styles.componentDemo}>
            <ThemedCard>
              <ThemedText>Card Content</ThemedText>
            </ThemedCard>
          </ThemedView>
          <ThemedText style={styles.componentCode}>
            {`<ThemedCard>
  <ThemedText>Card Content</ThemedText>
</ThemedCard>`}
          </ThemedText>
        </ThemedView>
        
        {/* ThemedDivider Example */}
        <ThemedView style={styles.componentExample}>
          <ThemedText style={styles.componentTitle}>ThemedDivider</ThemedText>
          <ThemedView style={styles.componentDemo}>
            <ThemedText>Content Above</ThemedText>
            <ThemedDivider />
            <ThemedText>Content Below</ThemedText>
          </ThemedView>
          <ThemedText style={styles.componentCode}>
            {`<ThemedText>Content Above</ThemedText>
<ThemedDivider />
<ThemedText>Content Below</ThemedText>`}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Responsive Behavior Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Responsive Behavior</ThemedText>
        <ThemedView style={styles.responsiveContainer}>
          <ThemedText style={styles.responsiveInfo}>
            Current Screen Width: {Math.round(responsiveInfo.width)}px
          </ThemedText>
          <ThemedText style={styles.responsiveInfo}>
            Detected Screen Type: {responsiveInfo.screenType}
          </ThemedText>
          
          <ThemedView style={styles.responsiveExamples}>
            {responsiveInfo.examples.map((example) => (
              <ThemedCard key={example.name} style={[
                styles.responsiveCard, 
                responsiveInfo.screenType === example.name.toLowerCase() as any && styles.activeResponsiveCard
              ]}>
                <ThemedText style={styles.responsiveCardTitle}>{example.name}</ThemedText>
                <ThemedText style={styles.responsiveCardRange}>
                  {example.minWidth}px - {example.maxWidth === Infinity ? '∞' : `${example.maxWidth}px`}
                </ThemedText>
                {responsiveInfo.screenType === example.name.toLowerCase() as any && (
                  <ThemedText style={styles.currentIndicator}>Current</ThemedText>
                )}
              </ThemedCard>
            ))}
          </ThemedView>
          
          <ThemedView style={styles.responsiveDemo}>
            <ThemedText style={styles.responsiveDemoTitle}>Responsive Spacing Example</ThemedText>
            <ThemedView style={styles.spacingDemoContainer}>
              <ThemedView style={[styles.spacingDemoBox, { margin: spacing.xs }]} />
              <ThemedView style={[styles.spacingDemoBox, { margin: spacing.sm }]} />
              <ThemedView style={[styles.spacingDemoBox, { margin: spacing.md }]} />
              <ThemedView style={[styles.spacingDemoBox, { margin: spacing.lg }]} />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: borderWidths.thin,
    borderBottomColor: colorPalette.border,
  },
  title: {
    ...textStyles.h1,
    marginBottom: spacing.md,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: borderWidths.thin,
    borderBottomColor: colorPalette.border,
  },
  sectionTitle: {
    ...textStyles.h2,
    marginBottom: spacing.md,
  },
  themeToggleContainer: {
    marginBottom: spacing.lg,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorSwatch: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  colorInfo: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  colorName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  hexValue: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  copyStatus: {
    fontSize: typography.sizes.xs,
    textAlign: 'center',
  },
  typographyContainer: {
    gap: spacing.lg,
  },
  typographyItem: {
    padding: spacing.md,
    borderBottomWidth: borderWidths.thin,
    borderBottomColor: colorPalette.border,
  },
  typographyExample: {
    marginBottom: spacing.sm,
  },
  typographyName: {
    ...textStyles.caption,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  typographyDetails: {
    ...textStyles.caption,
    color: colorPalette.textTertiary,
  },
  componentExample: {
    marginBottom: spacing.xl,
  },
  componentTitle: {
    ...textStyles.h3,
    marginBottom: spacing.md,
  },
  componentDemo: {
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colorPalette.backgroundSecondary,
    borderRadius: borderRadius.sm,
  },
  demoView: {
    padding: spacing.md,
    backgroundColor: colorPalette.primaryLight,
    borderRadius: borderRadius.sm,
  },
  componentCode: {
    ...textStyles.mono,
    backgroundColor: colorPalette.backgroundSecondary,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  responsiveContainer: {
    gap: spacing.lg,
  },
  responsiveInfo: {
    ...textStyles.body,
    marginBottom: spacing.sm,
  },
  responsiveExamples: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  responsiveCard: {
    flex: 1,
    marginHorizontal: spacing.sm,
    alignItems: 'center',
  },
  activeResponsiveCard: {
    borderColor: colorPalette.primary,
    borderWidth: borderWidths.thin,
  },
  responsiveCardTitle: {
    ...textStyles.h3,
    marginBottom: spacing.xs,
  },
  responsiveCardRange: {
    ...textStyles.caption,
    color: colorPalette.textTertiary,
    marginBottom: spacing.xs,
  },
  currentIndicator: {
    ...textStyles.caption,
    color: colorPalette.success,
    fontWeight: 'bold',
  },
  responsiveDemo: {
    marginTop: spacing.lg,
  },
  responsiveDemoTitle: {
    ...textStyles.h3,
    marginBottom: spacing.md,
  },
  spacingDemoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  spacingDemoBox: {
    width: 40,
    height: 40,
    backgroundColor: colorPalette.primary,
    borderRadius: borderRadius.sm,
  },
});

export default StyleGuideScreen;