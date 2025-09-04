// Navigation service

import { Linking } from 'react-native';
import { ROUTES } from '@/domain/constants';

// Deep link configuration
export const linking = {
  prefixes: ['wr://'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          [ROUTES.TODAY]: 'today',
          [ROUTES.DIAGNOSTICS]: 'diagnostics',
          [ROUTES.CONSOLE]: 'console',
        },
      },
      [ROUTES.RECORD]: 'record/:id',
      [ROUTES.CATALOG]: 'catalog',
      [ROUTES.SCENARIOS]: 'scenarios',
      [ROUTES.PROTOCOLS]: 'protocols',
      [ROUTES.SETTINGS]: 'settings',
      [ROUTES.STATUS]: 'status',
      [ROUTES.PROTOCOL_DETAIL]: 'protocol/:id',
      [ROUTES.ENTRY]: 'entry',
      [ROUTES.ARCHIVE]: 'archive',
      [ROUTES.DOCS]: 'docs',
    },
  },
};

// Handle deep links
export const handleDeepLink = async (url: string): Promise<void> => {
  try {
    const { hostname, path } = new URL(url);
    
    // Handle different deep link types
    switch (hostname) {
      case 'record':
        // Navigate to record screen with ID
        console.log('Navigate to record:', path);
        break;
      case 'protocol':
        // Navigate to protocol screen with ID
        console.log('Navigate to protocol:', path);
        break;
      case 'console':
        // Navigate to console screen
        console.log('Navigate to console');
        break;
      default:
        console.log('Unknown deep link:', url);
    }
  } catch (error) {
    console.error('Error handling deep link:', error);
  }
};

// Initialize deep linking
export const initializeDeepLinking = async (): Promise<void> => {
  // Handle initial URL
  const initialUrl = await Linking.getInitialURL();
  if (initialUrl) {
    await handleDeepLink(initialUrl);
  }
  
  // Listen for URL changes
  Linking.addEventListener('url', (event) => {
    handleDeepLink(event.url);
  });
};