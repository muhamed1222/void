// Higher-order component for theme integration

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Theme } from './index';

// Props for themed components
interface ThemedComponentProps {
  theme: Theme;
}

// Higher-order component to inject theme
export const withTheme = <P extends ThemedComponentProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, 'theme'>> => {
  const ThemedComponent: React.FC<Omit<P, 'theme'>> = (props) => {
    const { theme } = useTheme();
    
    return <Component {...(props as P)} theme={theme} />;
  };
  
  // Set display name for debugging
  const componentName = Component.displayName || Component.name || 'Component';
  ThemedComponent.displayName = `withTheme(${componentName})`;
  
  return ThemedComponent;
};

// Props for components that can override theme
interface ThemeOverrideProps {
  theme?: Theme;
}

// Higher-order component to allow theme override
export const withOptionalTheme = <P extends ThemeOverrideProps>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const ThemedComponent: React.FC<P> = (props) => {
    const { theme: contextTheme } = useTheme();
    const { theme: overrideTheme, ...restProps } = props;
    
    const theme = overrideTheme || contextTheme;
    
    return <Component {...(restProps as P)} theme={theme} />;
  };
  
  // Set display name for debugging
  const componentName = Component.displayName || Component.name || 'Component';
  ThemedComponent.displayName = `withOptionalTheme(${componentName})`;
  
  return ThemedComponent;
};

// Theme injector for class components
export interface ThemeInjectorProps {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const withThemeInjector = <P extends ThemeInjectorProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof ThemeInjectorProps>> => {
  const ThemeInjectorComponent: React.FC<Omit<P, keyof ThemeInjectorProps>> = (props) => {
    const themeContext = useTheme();
    
    return (
      <Component 
        {...(props as P)} 
        theme={themeContext.theme}
        isDarkMode={themeContext.isDarkMode}
        toggleTheme={themeContext.toggleTheme}
      />
    );
  };
  
  // Set display name for debugging
  const componentName = Component.displayName || Component.name || 'Component';
  ThemeInjectorComponent.displayName = `withThemeInjector(${componentName})`;
  
  return ThemeInjectorComponent;
};

// Theme consumer for render props pattern
interface ThemeConsumerProps {
  children: (theme: Theme, isDarkMode: boolean, toggleTheme: () => void) => React.ReactNode;
}

export const ThemeConsumer: React.FC<ThemeConsumerProps> = ({ children }) => {
  const themeContext = useTheme();
  
  return (
    <>
      {children(
        themeContext.theme,
        themeContext.isDarkMode,
        themeContext.toggleTheme
      )}
    </>
  );
};

// Theme-aware component wrapper
interface ThemeAwareWrapperProps {
  children: React.ReactNode;
  theme?: Theme;
}

export const ThemeAwareWrapper: React.FC<ThemeAwareWrapperProps> = ({ 
  children, 
  theme: overrideTheme 
}) => {
  const { theme: contextTheme } = useTheme();
  
  const theme = overrideTheme || contextTheme;
  
  // This component doesn't render anything itself, just provides theme context
  // to its children through the existing ThemeProvider
  return <>{children}</>;
};

// Utility function to create a themed styled component
export const createThemedComponent = <P extends ThemedComponentProps>(
  componentCreator: (theme: Theme) => React.ComponentType<P>
): React.FC<Omit<P, 'theme'>> => {
  const ThemedComponent: React.FC<Omit<P, 'theme'>> = (props) => {
    const { theme } = useTheme();
    const Component = componentCreator(theme);
    
    return <Component {...(props as P)} theme={theme} />;
  };
  
  return ThemedComponent;
};