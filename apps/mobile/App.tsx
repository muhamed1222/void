import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './src/theming/ThemeProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayScreen from './src/screens/Today';
import DiagnosticsScreen from './src/screens/Diagnostics';
import ConsoleScreen from './src/screens/Console';
import ProtocolsScreen from './src/screens/Protocols';
import ScenariosScreen from './src/screens/Scenarios';
import SettingsScreen from './src/screens/Settings';
import StatusScreen from './src/screens/Status';
import ProtocolDetailScreen from './src/screens/ProtocolDetail';
import EntryScreen from './src/screens/Entry';
import ArchiveScreen from './src/screens/Archive';
import DocsScreen from './src/screens/Docs';
import StyleGuideScreen from './src/screens/StyleGuide';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Diagnostics" component={DiagnosticsScreen} />
      <Tab.Screen name="Console" component={ConsoleScreen} />
    </Tab.Navigator>
  );
}

// Main app component
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Protocols" component={ProtocolsScreen} />
          <Stack.Screen name="Scenarios" component={ScenariosScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Status" component={StatusScreen} />
          <Stack.Screen name="ProtocolDetail" component={ProtocolDetailScreen} />
          <Stack.Screen name="Entry" component={EntryScreen} />
          <Stack.Screen name="Archive" component={ArchiveScreen} />
          <Stack.Screen name="Docs" component={DocsScreen} />
          <Stack.Screen name="StyleGuide" component={StyleGuideScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}